import { SchematicsException } from '@angular-devkit/schematics';
import { workspaces } from '@angular-devkit/core';
/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
export function getProjectFromWorkspace(
  workspace: workspaces.WorkspaceDefinition,
  projectName: string | undefined
): workspaces.ProjectDefinition {
  if (!projectName) {
    // TODO(crisbeto): some schematics APIs have the project name as optional so for now it's
    // simpler to allow undefined and checking it at runtime. Eventually we should clean this up.
    throw new SchematicsException('Project name is required.');
  }

  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}
