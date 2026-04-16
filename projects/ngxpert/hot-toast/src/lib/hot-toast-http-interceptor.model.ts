import type { HttpRequest } from '@angular/common/http';

import type { ToastOptions } from './hot-toast.model';

export type HotToastHttpInterceptorIgnoreContext = {
  error: unknown;
  status: number | undefined;
  url: string | undefined;
  request: HttpRequest<unknown>;
};

export type HotToastHttpInterceptorConfig = {
  /**
   * HTTP status codes for which no error toast is shown (for example `401` when the app handles auth globally).
   */
  ignoreStatuses?: readonly number[];
  /**
   * When true, no toast is shown for this failure. Use for custom filtering beyond status codes.
   */
  shouldIgnore?: (context: HotToastHttpInterceptorIgnoreContext) => boolean;
  /**
   * When true, the request bypasses error toasts entirely (success path unchanged).
   */
  skipRequest?: (context: { request: HttpRequest<unknown> }) => boolean;
  /**
   * When false, only `HttpErrorResponse` failures open a toast; other errors are rethrown silently.
   * @default true
   */
  showForUnknownErrors?: boolean;
  /**
   * Fixed message or resolver from the failure context. Return `undefined` or empty string to skip showing a toast while still rethrowing.
   */
  errorMessage?:
    | string
    | ((context: HotToastHttpInterceptorIgnoreContext) => string | undefined);
  /**
   * Extra options passed to `HotToastService.error` (merged after the resolved message).
   */
  toastOptions?: Partial<ToastOptions<unknown>>;
};

export const DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG: HotToastHttpInterceptorConfig = {
  ignoreStatuses: [],
  showForUnknownErrors: true,
};
