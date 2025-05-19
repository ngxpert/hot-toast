import { PlaygroundSchema } from './playground-schema';
import toastWithCustomStyleCode from './codes/toast-with-custom-style';
import toastWithMaterialIconCode from './codes/toast-with-material-icon';
import { ToastWithCustomStyleComponent } from './demos/toast-with-custom-style/toast-with-custom-style.component';
import { ToastWithMaterialIconComponent } from './demos/toast-with-material-icon/toast-with-material-icon.component';
import { ToastWithLineIndicatorComponent } from './demos/toast-with-line-indicator/toast-with-line-indicator.component';
import toastWithLineIndicatorCode from './codes/toast-with-line-indicator';
import { ToastWithConfettiComponent } from './demos/toast-with-confetti/toast-with-confetti.component';
import toastWithConfettiCode from './codes/toast-with-confetti';
import { ToastWithSonnerStyleComponent } from './demos/toast-with-sonner-style/toast-with-sonner-style.component';
import toastWithSonnerStyleCode from './codes/toast-with-sonner-style';

export const PLAYGROUND_ITEMS: PlaygroundSchema[] = [
  {
    title: 'Toast with custom style',
    id: 'toast-with-custom-style',
    description: 'A toast with gradient background, border, custom icon and font.',
    code: toastWithCustomStyleCode,
    component: ToastWithCustomStyleComponent,
  },
  {
    title: 'Toast with Material icon',
    id: 'toast-with-material-icon',
    description: 'A toast with Material icon.',
    code: toastWithMaterialIconCode,
    component: ToastWithMaterialIconComponent,
  },
  {
    title: 'Toast with line indicator',
    id: 'toast-with-line-indicator',
    description: 'A toast with a line indicator that shrinks to 0% width with duration.',
    code: toastWithLineIndicatorCode,
    component: ToastWithLineIndicatorComponent,
  },
  {
    title: 'Toast with confetti',
    id: 'toast-with-confetti',
    description:
      'A toast with <a href="https://github.com/catdad/canvas-confetti" target="_blank">canvas-confetti</a>.',
    code: toastWithConfettiCode,
    component: ToastWithConfettiComponent,
  },
  {
    title: 'Toast with Sonner style',
    id: 'toast-with-sonner-style',
    description:
      'A toast with styling inspired by the <a href="https://github.com/emilkowalski/sonner" target="_blank">Sonner</a> React toast library.',
    code: toastWithSonnerStyleCode,
    component: ToastWithSonnerStyleComponent,
  },
];

// Validate no duplicate IDs exist
const ids = PLAYGROUND_ITEMS.map((item) => item.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate playground item IDs found: ${duplicateIds.join(', ')}`);
}
