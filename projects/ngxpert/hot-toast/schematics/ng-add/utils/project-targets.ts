import { SchematicsException } from '@angular-devkit/schematics';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

/** Resolves the architect options for the build target of the given project. */
export const getProjectTargetOptions = (project: WorkspaceProject, buildTarget: string) => {
  if (project.targets && project.targets[buildTarget] && project.targets[buildTarget].options) {
    return project.targets[buildTarget].options;
  }

  if (project.architect && project.architect[buildTarget] && project.architect[buildTarget].options) {
    return project.architect[buildTarget].options;
  }

  throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
};

export const targetBuildNotFoundError = (): SchematicsException =>
  new SchematicsException(`Project target "build" not found.`);
