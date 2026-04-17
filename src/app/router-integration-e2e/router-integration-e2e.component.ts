import { Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

/**
 * E2E harness for onRouteChange. Navigates via query-param changes so the
 * component stays mounted throughout, letting the subscription process both
 * NavigationStart and NavigationEnd in full.
 */
@Component({
  selector: 'app-router-integration-e2e',
  template: `
    <div class="p-8 max-w-xl space-y-4">
      <h1 class="text-2xl font-bold">Router integration E2E</h1>
      <p class="text-sm text-gray-600">
        Buttons trigger Angular Router navigations (query-param changes). The toast reacts to each
        router event via <code>onRouteChange</code>. The component stays mounted so both
        NavigationStart and NavigationEnd are handled.
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          id="route-e2e-close-all"
          class="rounded border border-gray-400 px-3 py-2 text-sm"
          (click)="closeAllToasts()"
        >
          Close all toasts
        </button>
        <button
          type="button"
          id="route-e2e-navigate-a"
          class="rounded bg-gray-800 px-3 py-2 text-sm text-white"
          (click)="navigateA()"
        >
          Navigate A
        </button>
        <button
          type="button"
          id="route-e2e-navigate-b"
          class="rounded bg-gray-800 px-3 py-2 text-sm text-white"
          (click)="navigateB()"
        >
          Navigate B
        </button>
      </div>
    </div>
  `,
})
export class RouterIntegrationE2eComponent {
  private readonly router = inject(Router);
  private readonly toast = inject(HotToastService);

  constructor() {
    this.toast.onRouteChange({
      [NavigationStart.name]: 'Navigating...',
      [NavigationEnd.name]: { message: 'Navigation complete', type: 'success', duration: 3000 },
      [NavigationCancel.name]: { message: 'Navigation cancelled', type: 'warning' },
      [NavigationError.name]: { message: 'Navigation failed', type: 'error' },
    });
  }

  closeAllToasts(): void {
    this.toast.close();
  }

  navigateA(): void {
    this.router.navigate(['/router-integration-e2e'], { queryParams: { step: 'a' } });
  }

  navigateB(): void {
    this.router.navigate(['/router-integration-e2e'], { queryParams: { step: 'b' } });
  }
}
