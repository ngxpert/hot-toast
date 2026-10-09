import { Component, inject } from '@angular/core';
import { HotToastService, ToastConfig, ToastOptions } from '@ngxpert/hot-toast';
import { DEPTH_E2E_CONFIG, DEPTH_E2E_TOAST_COUNT } from './depth-stacking-e2e.config';

@Component({
  selector: 'app-depth-stacking-e2e',

  template: `
    <div class="p-8 max-w-xl space-y-4">
      <h1 class="text-2xl font-bold">Depth stacking E2E</h1>
      <p class="text-sm text-gray-600">
        Buttons show more persistent toasts than <code>visibleToasts</code> so the oldest ones are soft-closed.
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          id="depth-e2e-persistent"
          class="rounded bg-gray-800 px-3 py-2 text-sm text-white"
          (click)="showPersistentToasts()"
        >
          {{ toastCount }} persistent toasts
        </button>
      </div>
    </div>
  `,
})
export class DepthStackingE2eComponent {
  private readonly toast = inject(HotToastService);
  protected readonly toastCount = DEPTH_E2E_TOAST_COUNT;

  showPersistentToasts(): void {
    this.showToasts({ autoClose: false, dismissible: true });
  }

  private showToasts(
    options: ToastOptions<unknown>,
    config: Partial<ToastConfig> = {},
    count = DEPTH_E2E_TOAST_COUNT,
  ): void {
    this.toast.defaultConfig = { ...this.toast.defaultConfig, ...DEPTH_E2E_CONFIG, ...config };

    // Shown one at a time so the oldest toast is soft-closed once the cap is exceeded.
    for (let i = 1; i <= count; i++) {
      setTimeout(
        () => {
          this.toast.show('Depth toast ' + i, { ...options, attributes: { 'data-test': 'depth-toast-' + i } });
        },
        (i - 1) * 400,
      );
    }
  }
}
