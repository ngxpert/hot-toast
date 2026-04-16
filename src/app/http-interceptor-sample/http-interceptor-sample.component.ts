import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from '../../environments/environment';

type SampleApiEndpoint = {
  id: string;
  label: string;
  path: string;
  method: 'GET' | 'POST';
  hint: string;
  extraHeaders?: Record<string, string>;
  body?: unknown;
};

const SAMPLE_API_ENDPOINTS: readonly SampleApiEndpoint[] = [
  { id: 'health', label: 'GET /api/health', path: '/api/health', method: 'GET', hint: '200 — no error toast' },
  {
    id: 'unauthorized',
    label: 'GET /api/unauthorized',
    path: '/api/unauthorized',
    method: 'GET',
    hint: '401 — skipped when ignoreStatuses includes 401',
  },
  { id: 'forbidden', label: 'GET /api/forbidden', path: '/api/forbidden', method: 'GET', hint: '403 — error toast' },
  { id: 'not-found', label: 'GET /api/not-found', path: '/api/not-found', method: 'GET', hint: '404 — error toast' },
  {
    id: 'bad-request',
    label: 'GET /api/bad-request',
    path: '/api/bad-request',
    method: 'GET',
    hint: '400 — error toast (plain text body)',
  },
  { id: 'conflict', label: 'GET /api/conflict', path: '/api/conflict', method: 'GET', hint: '409 — error toast' },
  {
    id: 'server-error',
    label: 'GET /api/server-error',
    path: '/api/server-error',
    method: 'GET',
    hint: '500 — error toast',
  },
  { id: 'teapot', label: 'GET /api/teapot', path: '/api/teapot', method: 'GET', hint: '418 — error toast' },
  {
    id: 'network-style',
    label: 'GET /api/network-style',
    path: '/api/network-style',
    method: 'GET',
    hint: 'Connection closed — network-style error',
  },
  {
    id: 'echo',
    label: 'POST /api/echo',
    path: '/api/echo',
    method: 'POST',
    hint: '200 — no error toast',
    body: { source: 'hot-toast-sample-page' },
  },
  {
    id: 'skip-header',
    label: 'GET /api/skip-toast-header',
    path: '/api/skip-toast-header',
    method: 'GET',
    hint: 'Send X-Skip-Toast: 1 → 422 (configure skipRequest to hide toast)',
    extraHeaders: { 'X-Skip-Toast': '1' },
  },
];

@Component({
  selector: 'app-http-interceptor-sample',
  imports: [RouterLink],
  templateUrl: './http-interceptor-sample.component.html',
})
export class HttpInterceptorSampleComponent {
  readonly endpoints = SAMPLE_API_ENDPOINTS;

  private readonly http = inject(HttpClient);

  readonly apiBase = environment.sampleHttpTestServerUrl;
  readonly hasApiBase = this.apiBase.length > 0;

  private readonly lastLog = signal<string>('');
  readonly lastLogText = this.lastLog.asReadonly();

  fire(endpoint: SampleApiEndpoint): void {
    if (!this.apiBase) {
      this.lastLog.set('No sample server URL configured.');
      return;
    }

    const url = `${this.apiBase}${endpoint.path}`;
    let headers = new HttpHeaders();
    if (endpoint.extraHeaders) {
      for (const [key, value] of Object.entries(endpoint.extraHeaders)) {
        headers = headers.set(key, value);
      }
    }

    if (endpoint.method === 'POST') {
      this.http.post(url, endpoint.body ?? {}, { headers }).subscribe({
        next: (body) => {
          this.lastLog.set(`OK — ${JSON.stringify(body)}`);
        },
        error: (err: unknown) => {
          this.lastLog.set(this.formatHttpError(err));
        },
      });
      return;
    }

    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: (body) => {
        this.lastLog.set(`OK — ${body.slice(0, 200)}`);
      },
      error: (err: unknown) => {
        this.lastLog.set(this.formatHttpError(err));
      },
    });
  }

  private formatHttpError(err: unknown): string {
    if (err && typeof err === 'object' && 'status' in err) {
      const e = err as { status?: number; message?: string };
      return `Observable error — HTTP ${e.status ?? '?'} — ${e.message ?? ''}`.trim();
    }
    return `Observable error — ${String(err)}`;
  }
}
