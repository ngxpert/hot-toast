import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

/** Path prefix stubbed by Cypress `cy.intercept`; must match patterns in `toast_http_interceptor.cy.ts`. */
const E2E_HTTP_PREFIX = '/__hot-toast-e2e__/http';

@Component({
  selector: 'app-http-interceptor-e2e',
  template: `
    <div class="p-8 max-w-xl space-y-4">
      <h1 class="text-2xl font-bold">HTTP interceptor E2E</h1>
      <p class="text-sm text-gray-600">
        Buttons call HttpClient; Cypress stubs responses on <code>{{ prefix }}</code>.
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          id="http-e2e-close-all"
          class="rounded border border-gray-400 px-3 py-2 text-sm"
          (click)="closeAllToasts()"
        >
          Close all toasts
        </button>
        <button type="button" id="http-e2e-500" class="rounded bg-gray-800 px-3 py-2 text-sm text-white" (click)="get500()">
          GET 500
        </button>
        <button type="button" id="http-e2e-401" class="rounded bg-gray-800 px-3 py-2 text-sm text-white" (click)="get401()">
          GET 401
        </button>
        <button type="button" id="http-e2e-403" class="rounded bg-gray-800 px-3 py-2 text-sm text-white" (click)="get403()">
          GET 403
        </button>
      </div>
    </div>
  `,
})
export class HttpInterceptorE2eComponent {
  readonly prefix = E2E_HTTP_PREFIX;

  private readonly http = inject(HttpClient);
  private readonly toast = inject(HotToastService);

  closeAllToasts(): void {
    this.toast.close();
  }

  get500(): void {
    this.http.get(`${E2E_HTTP_PREFIX}/500`, { responseType: 'text' }).subscribe({ error: () => undefined });
  }

  get401(): void {
    this.http.get(`${E2E_HTTP_PREFIX}/401`, { responseType: 'text' }).subscribe({ error: () => undefined });
  }

  get403(): void {
    this.http.get(`${E2E_HTTP_PREFIX}/403`, { responseType: 'text' }).subscribe({ error: () => undefined });
  }
}
