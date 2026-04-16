import { logging, workspaces } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { readWorkspace } from '@schematics/angular/utility';
import { Schema, HotToastThemeOption } from '../schema';
import { getProjectBuildTargets, getProjectTargetOptions, getProjectTestTargets } from '../../utils/project-targets';
import { getProjectFromWorkspace } from '../../utils/get-project';
import * as path from 'path';
import { getProjectStyleFile } from '../../utils/project';

const BASE_CSS_FILEPATH = `@ngxpert/hot-toast/styles.css`;
const THEME_CSS_FILEPATH = (theme: HotToastThemeOption) => `@ngxpert/hot-toast/themes/${theme}.css`;

const BASE_SCSS_IMPORT = `
/* Importing @ngxpert/hot-toast base styles. */
@use '@ngxpert/hot-toast/styles';
`;

const THEME_SCSS_IMPORT = (theme: HotToastThemeOption) => `
/* Importing @ngxpert/hot-toast ${theme} theme. */
@use '@ngxpert/hot-toast/themes/${theme}';
`;

const SUPPORTED_STYLE_EXTENSIONS = new Set(['.scss', '.sass']);

/** Add pre-built styles (and optionally a theme) to the main project style file. */
export function addThemeToAppStyles(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await readWorkspace(host);

    const projectName = options.project || workspace.extensions.defaultProject!.toString();
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Unable to find project '${projectName}' in the workspace`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styleFilePath = getProjectStyleFile(project as any) || '';
    const styleFileExtension = path.extname(styleFilePath);
    const isScssOrSass = SUPPORTED_STYLE_EXTENSIONS.has(styleFileExtension);

    const selectedTheme = (options.theme ?? 'none') as HotToastThemeOption;

    if (isScssOrSass) {
      let patch = BASE_SCSS_IMPORT;
      if (selectedTheme !== 'none') {
        patch += THEME_SCSS_IMPORT(selectedTheme);
      }
      return addNgxpertHotToastToStylesFile(styleFilePath, patch);
    }

    // Non-SCSS project: inject CSS files into angular.json styles array.
    return insertPrebuiltStyles(options.project, selectedTheme, context.logger as unknown as logging.LoggerApi);
  };
}

/** Insert pre-built CSS file(s) into the angular.json file. */
function insertPrebuiltStyles(
  project: string,
  theme: HotToastThemeOption,
  logger: logging.LoggerApi,
): Rule {
  const rules: Rule[] = [
    addThemeStyleToTarget(project, 'build', BASE_CSS_FILEPATH, logger),
    addThemeStyleToTarget(project, 'test', BASE_CSS_FILEPATH, logger),
  ];

  if (theme !== 'none') {
    const themeCssPath = THEME_CSS_FILEPATH(theme);
    rules.push(
      addThemeStyleToTarget(project, 'build', themeCssPath, logger),
      addThemeStyleToTarget(project, 'test', themeCssPath, logger),
    );
  }

  return chain(rules);
}

/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(
  projectName: string,
  targetName: 'test' | 'build',
  assetPath: string,
  logger: logging.LoggerApi,
): Rule {
  return updateWorkspace((workspace) => {
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
  logger: logging.LoggerApi,
) {
  const targets = targetName === 'test' ? getProjectTestTargets(project) : getProjectBuildTargets(project);
  const isDefaultBuilder = targets.length > 0;

  if (!isDefaultBuilder && targetName === 'build') {
    throw new SchematicsException(
      `Your project is not using the default builders for ` +
        `"${targetName}". The Angular Material schematics cannot add a theme to the workspace ` +
        `configuration if the builder has been changed.`,
    );
  } else if (!isDefaultBuilder) {
    logger.warn(
      `Your project is not using the default builders for "${targetName}". This ` +
        `means that we cannot add the configured theme to the "${targetName}" target.`,
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
