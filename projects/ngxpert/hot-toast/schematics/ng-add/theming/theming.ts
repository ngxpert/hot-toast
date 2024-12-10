import { logging, workspaces } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { readWorkspace } from '@schematics/angular/utility';
import { Schema } from '../schema';
import { getProjectBuildTargets, getProjectTargetOptions, getProjectTestTargets } from '../../utils/project-targets';
import { getProjectFromWorkspace } from '../../utils/get-project';
import * as path from 'path';
import { getProjectStyleFile } from '../../utils/project';

const NGXPERT_CSS_FILEPATH = `@ngxpert/hot-toast/styles.css`;
const SUPPORTED_NGXPER_HOT_TOAST_STYLE_IMPORTS: Record<string, string> = {
  '.sass': `
/* Importing @ngxpert/hot-toast SCSS file. */
@use '@ngxpert/hot-toast/styles'
`,
  '.scss': `
/* Importing @ngxpert/hot-toast SCSS file. */
@use '@ngxpert/hot-toast/styles';
`,
};
/** Add pre-built styles to the main project style file. */
export function addThemeToAppStyles(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await readWorkspace(host);

    const projectName = options.project || workspace.extensions.defaultProject!.toString();
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Unable to find project '${project}' in the workspace`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styleFilePath = getProjectStyleFile(project as any) || '';
    const styleFileExtension = path.extname(styleFilePath);
    const styleFilePatch = SUPPORTED_NGXPER_HOT_TOAST_STYLE_IMPORTS[styleFileExtension];

    if (styleFilePatch) {
      return addNgxpertHotToastToStylesFile(styleFilePath, styleFilePatch);
    } else {
      // found supported styles
      return insertPrebuiltTheme(options.project, context.logger);
    }
  };
}

/** Insert a pre-built theme into the angular.json file. */
function insertPrebuiltTheme(project: string, logger: logging.LoggerApi): Rule {
  return chain([
    addThemeStyleToTarget(project, 'build', NGXPERT_CSS_FILEPATH, logger),
    addThemeStyleToTarget(project, 'test', NGXPERT_CSS_FILEPATH, logger),
  ]);
}

/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(
  projectName: string,
  targetName: 'test' | 'build',
  assetPath: string,
  logger: logging.LoggerApi
): Rule {
  // @ts-expect-error ignore the error
  return updateWorkspace((workspace) => {
    // @ts-expect-error ignore the error
    const project = getProjectFromWorkspace(workspace, projectName);

    // Do not update the builder options in case the target does not use the default CLI builder.
    if (!validateDefaultTargetBuilder(project, targetName, logger)) {
      return;
    }

    const targetOptions = getProjectTargetOptions(project, targetName);
    const styles = targetOptions['styles'] as (string | { input: string })[];

    if (!styles) {
      targetOptions['styles'] = [assetPath];
    } else {
      styles.unshift(assetPath);
    }
  });
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(
  project: workspaces.ProjectDefinition,
  targetName: 'build' | 'test',
  logger: logging.LoggerApi
) {
  const targets = targetName === 'test' ? getProjectTestTargets(project) : getProjectBuildTargets(project);
  const isDefaultBuilder = targets.length > 0;

  // Because the build setup for the Angular CLI can be customized by developers, we can't know
  // where to put the theme file in the workspace configuration if custom builders are being
  // used. In case the builder has been changed for the "build" target, we throw an error and
  // exit because setting up a theme is a primary goal of `ng-add`. Otherwise if just the "test"
  // builder has been changed, we warn because a theme is not mandatory for running tests
  // with Material. See: https://github.com/angular/components/issues/14176
  if (!isDefaultBuilder && targetName === 'build') {
    throw new SchematicsException(
      `Your project is not using the default builders for ` +
        `"${targetName}". The Angular Material schematics cannot add a theme to the workspace ` +
        `configuration if the builder has been changed.`
    );
  } else if (!isDefaultBuilder) {
    // for non-build targets we gracefully report the error without actually aborting the
    // setup schematic. This is because a theme is not mandatory for running tests.
    logger.warn(
      `Your project is not using the default builders for "${targetName}". This ` +
        `means that we cannot add the configured theme to the "${targetName}" target.`
    );
  }

  return isDefaultBuilder;
}

function addNgxpertHotToastToStylesFile(styleFilePath: string, styleFilePatch: string): Rule {
  return (host: Tree) => {
    const styleContent = host.read(styleFilePath)!.toString('utf-8');

    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertRight(styleContent.length, styleFilePatch);

    host.commitUpdate(recorder);
  };
}
