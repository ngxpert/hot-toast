import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
  HotToastHttpInterceptorConfig,
  HotToastHttpInterceptorIgnoreContext,
} from './hot-toast-http-interceptor.model';
import { HotToastService } from './hot-toast.service';

export const HOT_TOAST_HTTP_INTERCEPTOR_CONFIG = new InjectionToken<HotToastHttpInterceptorConfig>(
  'HOT_TOAST_HTTP_INTERCEPTOR_CONFIG',
);

function resolveErrorMessage(context: HotToastHttpInterceptorIgnoreContext): string {
  const { error } = context;
  if (error instanceof HttpErrorResponse) {
    if (typeof error.error === 'string' && error.error.trim().length > 0) {
      return error.error;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong';
}

function resolveToastMessage(
  config: HotToastHttpInterceptorConfig,
  context: HotToastHttpInterceptorIgnoreContext,
): string | undefined {
  if (typeof config.errorMessage === 'function') {
    return config.errorMessage(context);
  }
  if (typeof config.errorMessage === 'string') {
    return config.errorMessage;
  }
  return resolveErrorMessage(context);
}

/**
 * Shows an error toast for failed HTTP calls. Register with
 * `provideHttpClient(withInterceptors([hotToastHttpInterceptor]))` (and your other HTTP features),
 * and optionally call {@link provideHotToastHttpInterceptor} for ignore rules and messages.
 */
export const hotToastHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const toast = inject(HotToastService);
  const injectedConfig = inject(HOT_TOAST_HTTP_INTERCEPTOR_CONFIG, { optional: true });
  const config: HotToastHttpInterceptorConfig = {
    ...DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
    ...injectedConfig,
  };

  if (config.skipRequest?.({ request: req })) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: unknown) => {
      if (isPlatformServer(platformId)) {
        return throwError(error);
      }

      const status = error instanceof HttpErrorResponse ? error.status : undefined;
      const url = error instanceof HttpErrorResponse ? error.url ?? undefined : undefined;
      const context: HotToastHttpInterceptorIgnoreContext = {
        error,
        request: req,
        status,
        url: url ?? req.url,
      };

      if (status !== undefined && config.ignoreStatuses?.includes(status)) {
        return throwError(error);
      }

      if (config.shouldIgnore?.(context)) {
        return throwError(error);
      }

      if (!(error instanceof HttpErrorResponse) && !config.showForUnknownErrors) {
        return throwError(error);
      }

      const message = resolveToastMessage(config, context);
      if (message) {
        toast.error(message, config.toastOptions);
      }

      return throwError(error);
    }),
  );
};

/**
 * Optional configuration for {@link hotToastHttpInterceptor}. Add the interceptor to `HttpClient`, for example:
 *
 * ```ts
 * provideHttpClient(withFetch(), withInterceptors([hotToastHttpInterceptor])),
 * provideHotToastHttpInterceptor({ ignoreStatuses: [401] }),
 * ```
 */
export function provideHotToastHttpInterceptor(
  config?: Partial<HotToastHttpInterceptorConfig>,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
      useValue: { ...DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG, ...config },
    },
  ]);
}
