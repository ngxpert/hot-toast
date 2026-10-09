import type { ToastConfig } from '@ngxpert/hot-toast';

/** Shared between the demo page and `cypress/e2e/toast_depth_stacking.cy.ts`. */
export const DEPTH_E2E_CONFIG = {
  stacking: 'depth',
  visibleToasts: 3,
  position: 'bottom-center',
  reverseOrder: false,
} satisfies Partial<ToastConfig>;

/** More than `visibleToasts` so the oldest toasts are soft-closed. */
export const DEPTH_E2E_TOAST_COUNT = 4;
