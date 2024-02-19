import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { SchematicsException } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from './project-targets';

/** Looks for the main TypeScript file in the given project and returns its path. */
export const getProjectMainFile = (project: WorkspaceProject): string => {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.main) {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` + `workspace config (${project.sourceRoot})`
    );
  }

  return buildOptions.main;
};
