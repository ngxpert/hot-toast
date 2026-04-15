import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CodeComponent } from '../../shared/components/code/code.component';

@Component({
  selector: 'app-http-interceptor-doc',
  imports: [CodeComponent, RouterLink],
  templateUrl: './http-interceptor-doc.component.html',
})
export class HttpInterceptorDocComponent {
  setupSnippet = `
import {
  hotToastHttpInterceptor,
  provideHotToastHttpInterceptor,
  provideHotToastConfig,
} from '@ngxpert/hot-toast';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideHotToastConfig(),
    provideHttpClient(withFetch(), withInterceptors([hotToastHttpInterceptor])),
    provideHotToastHttpInterceptor({
      ignoreStatuses: [401],
    }),
  ],
});
`.trim();

  configSnippet = `
import { provideHotToastHttpInterceptor } from '@ngxpert/hot-toast';

provideHotToastHttpInterceptor({
  /** No toast for these HTTP status codes */
  ignoreStatuses: [401, 404],
  /** Return true to skip the toast for this failure */
  shouldIgnore: ({ error, status, url, request }) => false,
  /** Skip toasts entirely for matching outgoing requests */
  skipRequest: ({ request }) => request.headers.get('X-Skip-Toast') === '1',
  /** When false, only HttpErrorResponse opens a toast */
  showForUnknownErrors: true,
  /** Fixed string or resolver; return undefined to rethrow without a toast */
  errorMessage: (ctx) => undefined,
  /** Passed to HotToastService.error */
  toastOptions: { duration: 6000 },
});
`.trim();
}
