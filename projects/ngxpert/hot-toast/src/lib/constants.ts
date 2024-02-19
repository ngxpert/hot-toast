import { ToastType } from './hot-toast.model';

export const HOT_TOAST_DEFAULT_TIMEOUTS: {
  [key in ToastType]: number;
} = {
  blank: 4000,
  error: 4000,
  success: 4000,
  loading: 30000,
  warning: 4000,
  info: 4000,
};

export const EXIT_ANIMATION_DURATION = 800;
export const ENTER_ANIMATION_DURATION = 350;

export const HOT_TOAST_MARGIN = 8;

export const HOT_TOAST_DEPTH_SCALE = 0.05;
export const HOT_TOAST_DEPTH_SCALE_ADD = 1;