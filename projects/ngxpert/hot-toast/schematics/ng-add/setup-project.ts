/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { chain, Rule, SchematicContext, Tree, callRule } from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { Observable, of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming/theming';

export default function (options: Schema): Rule {
  return chain([addHotToastConfig(options), addThemeToAppStyles(options)]);
}

function addHotToastConfig(options: Schema): Rule {
  const rule = (host: Tree, context: SchematicContext) => {
    // `addRootProvider` returns a `Rule` from the `@angular-devkit/schematics` copy nested under
    // `@schematics/angular`, which is nominally distinct from this package's copy. Bridge to our
    // copy's type so it can be passed to `callRule`.
    const hotToastConfigRule = addRootProvider(options.project, ({ code, external }) => {
      return code`${external('provideHotToastConfig', '@ngxpert/hot-toast')}()`;
    }) as unknown as Rule;

    // The `addRootProvider` rule can throw in some custom scenarios (see #28640).
    // Add some error handling around it so the setup isn't interrupted.
    // `callRule` returns an `Observable` from the rxjs copy nested under `@angular-devkit/core`,
    // which is a different rxjs major than this package's copy. Bridge to our copy so the
    // operators below (`catchError`/`of`) line up.
    const result = callRule(hotToastConfigRule, host, context) as unknown as Observable<Tree>;
    return result.pipe(
      catchError(() => {
        context.logger.error(
          'Failed to add @ngxpert/hot-toast config to project. Continuing with the @ngxpert/hot-toast setup.',
        );
        context.logger.info(
          'Read more about setting up the config manually: https://github.com/ngxpert/hot-toast?tab=readme-ov-file#standalone-setup',
        );
        return observableOf(host);
      }),
    );
  };

  // The inner rule resolves to our rxjs `Observable`, while `Rule`'s return type references the
  // rxjs copy nested under `@angular-devkit/core`; bridge at this single boundary.
  return rule as unknown as Rule;
}
