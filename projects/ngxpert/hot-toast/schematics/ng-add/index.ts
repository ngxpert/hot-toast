import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson } from './package-config';
import { Schema } from './schema';
export function ngAdd(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, '@ngneat/overview', '6.1.1');
    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
