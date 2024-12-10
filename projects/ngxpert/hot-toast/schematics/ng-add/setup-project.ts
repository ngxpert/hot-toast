/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { chain, Rule, SchematicContext, Tree, callRule } from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming/theming';

export default function (options: Schema): Rule {
  return chain([addHotToastConfig(options), addThemeToAppStyles(options)]);
}

function addHotToastConfig(options: Schema): Rule {
  // @ts-expect-error ignore the error
  return (host: Tree, context: SchematicContext) => {
    const hotToastConfigRule = addRootProvider(options.project, ({ code, external }) => {
      return code`${external('provideHotToastConfig', '@ngxpert/hot-toast')}()`;
    });

    // The `addRootProvider` rule can throw in some custom scenarios (see #28640).
    // Add some error handling around it so the setup isn't interrupted.
    // @ts-expect-error ignore the error
    return callRule(hotToastConfigRule, host, context).pipe(
      // @ts-expect-error ignore the error
      catchError(() => {
        context.logger.error(
          'Failed to add @ngxpert/hot-toast config to project. Continuing with the @ngxpert/hot-toast setup.'
        );
        context.logger.info(
          'Read more about setting up the config manually: https://github.com/ngxpert/hot-toast?tab=readme-ov-file#standalone-setup'
        );
        return observableOf(host);
      })
    );
  };
}
