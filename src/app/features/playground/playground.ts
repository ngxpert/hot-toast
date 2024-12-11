import { AngularLogoComponent, MaterialIconComponent } from './components';
import { PlaygroundSchema } from './playground-schema';

export const PLAYGROUND_ITEMS: PlaygroundSchema[] = [
  {
    title: 'Toast with custom style',
    id: 'toast-with-custom-style',
    description: 'A toast with gradient background, border, custom icon and font.',
    message: 'Hot toast ❤️ Angular',
    options: {
      icon: AngularLogoComponent,
      style: {
        background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, color(srgb 0.996034 0.913028 0.987763 / 0.9) 80%)',
        fontFamily: 'sans-serif',
        border: '1px solid oklch(69.02% .277 332.77)',
      },
    },
  },
  {
    title: 'Toast with Material icon',
    id: 'toast-with-material-icon',
    message: 'Hot toast with Material icon',
    options: {
      icon: `<span class="material-symbols-outlined">favorite</span>`,
    },
    notes:
      'This demo requires the Material Symbols font to be loaded. For example, you can add the following to your index.html file: <code>&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /&gt;</code>',
  },
];

// Validate no duplicate IDs exist
const ids = PLAYGROUND_ITEMS.map((item) => item.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate playground item IDs found: ${duplicateIds.join(', ')}`);
}
