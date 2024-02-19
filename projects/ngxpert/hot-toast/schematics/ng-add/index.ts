/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { Schema } from './schema';
import {
  addPackageToPackageJson,
  getProjectFromWorkspace,
  getWorkspace,
  addStyleToTarget,
} from './utils';
import { targetBuildNotFoundError } from './utils/project-targets';
import { getProjectStyleFile } from './utils/project-style-file';

const stylesPath = `node_modules/@ngxpert/hot-toast/src/styles`;

export function ngAdd(options: Schema): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }
    return chain([
      addPackageJsonDependencies(),
      installPackageJsonDependencies(),
      injectImports(options),
      addModuleToImports(options),
      addHotToastAppStyles(options),
    ]);
  };
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: { name: string; version: string }[] = [{ name: '@ngneat/overview', version: '6.0.0' }];

    dependencies.forEach((dependency) => {
      addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
      context.logger.log('info', `✅️ Added "${dependency.name}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

function injectImports(options: Schema): Rule {
  return (host: Tree) => {
    if (!options.skipImport) {
      const workspace = getWorkspace(host) as any;
      const project = getProjectFromWorkspace(
        workspace,
        options.project ? options.project : Object.keys(workspace.projects)[0]
      );

      if (!project || project.projectType !== 'application') {
        throw new SchematicsException(`A client project type of "application" is required.`);
      }

      if (
        !project.architect ||
        !project.architect.build ||
        !project.architect.build.options ||
        !project.architect.build.options.main
      ) {
        throw targetBuildNotFoundError();
      }

      // if (!isStandaloneApp(host, project.architect.build.options.main)) {
      //   const modulePath = getAppModulePath(host, project.architect.build.options.main);
      //   const moduleSource = getSourceFile(host, modulePath);

      //   importModuleSet.forEach((item) => {
      //     if (isImported(moduleSource, item.moduleName, item.importPath)) {
      //       context.logger.warn(`Could not import "${item.moduleName}" because it's already imported.`);
      //     } else {
      //       const change = insertImport(moduleSource, modulePath, item.moduleName, item.importPath);

      //       if (change) {
      //         const recorder = host.beginUpdate(modulePath);
      //         recorder.insertLeft((change as InsertChange).pos, (change as InsertChange).toAdd);
      //         host.commitUpdate(recorder);
      //         context.logger.log('info', '✅ Written import statement for "' + item.moduleName + '"');
      //       }
      //     }
      //   });
      // }
      return host;
    }
  };
}

function addModuleToImports(options: Schema): Rule {
  return (host: Tree) => {
    if (!options.skipImport) {
      const workspace = getWorkspace(host) as any;
      const project = getProjectFromWorkspace(
        workspace,
        options.project ? options.project : Object.keys(workspace.projects)[0]
      );

      if (!project || project.projectType !== 'application') {
        throw new SchematicsException(`A client project type of "application" is required.`);
      }
      if (!project.architect) {
        throw new SchematicsException(`Architect options not present for project.`);
      }
      if (!project.architect.build) {
        throw new SchematicsException(`Architect:Build options not present for project.`);
      }

      // if (!isStandaloneApp(host, project.architect.build.options.main)) {
      //   const modulePath = getAppModulePath(host, project.architect.build.options.main);

      //   importModuleSet.forEach((item) => {
      //     if (hasNgModuleImport(host, modulePath, item.moduleName)) {
      //       context.logger.warn(`Could not set up "${item.moduleName}" in "imports[]" because it's already imported.`);
      //     } else {
      //       addModuleImportToRootModule(host, item.importModuleStatement, null as any, project);
      //       context.logger.log('info', '✅ Imported "' + item.moduleName + '" in imports');
      //     }
      //   });
      // }
    }

    return host;
  };
}

/**
 * Adds custom styles to the project style file.
 */
function addHotToastAppStyles(options: Schema) {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace.projects)[0]
    );
    const styleFilePath = getProjectStyleFile(project);
    const logger = context.logger;

    if (!styleFilePath) {
      logger.error(`Could not find the default style file for this project.`);
      logger.info(`Consider manually adding the hot-toast styles to your Application.`);
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      logger.error(`Could not read the default style file within the project ` + `(${styleFilePath})`);
      logger.info(`Please consider manually setting up the hot-toast styles.`);
      return;
    }

    /** If the file is css then add the styles to the Angular.json else add it to the styles.scss */
    if (styleFilePath.includes('.css')) {
      return insertCSSDependency(options, 'build');
    }

    const htmlContent = buffer.toString();
    const insertion = `@use '${stylesPath}/styles.scss'\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(0, insertion);
    host.commitUpdate(recorder);
    context.logger.log('info', '✅ Styles Added to "' + styleFilePath);
  };
}

function insertCSSDependency(options: Schema, targetName: string): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host) as any;
    const project = getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace.projects)[0]
    );

    if (!project || project.projectType !== 'application') {
      throw new SchematicsException(`A client project type of "application" is required.`);
    }

    const cssfile = `${stylesPath}/styles.css`;

    addStyleToTarget(project, targetName, host, cssfile, workspace);
    context.logger.log('info', '✅ Styles Imported in angular.json');

    return host;
  };
}
