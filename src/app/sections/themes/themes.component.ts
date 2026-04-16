import { Component, inject } from '@angular/core';
import { HotToastService, ToastTheme } from '@ngxpert/hot-toast';
import { CodeComponent } from '../../shared/components/code/code.component';
import { EmojiButtonComponent } from '../../shared/components/emoji-button/emoji-button.component';
import { HtmlPipe } from '../../shared/pipes/html.pipe';
import { NgClass } from '@angular/common';

type ThemeDemo = {
  id: ToastTheme;
  label: string;
  emoji: string;
  description: string;
  scssSnippet: string;
  cssSnippet: string;
  tsSnippet: string;
  activeTab: 'scss' | 'css' | 'ts';
  action: () => void;
};

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  imports: [CodeComponent, EmojiButtonComponent, HtmlPipe, NgClass],
})
export class ThemesComponent {
  private toast = inject(HotToastService);

  readonly globalConfigSnippet = `// app.config.ts
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig = {
  providers: [
    provideHotToastConfig({ theme: 'material' }),
  ],
};`;

  readonly darkModeSnippet = `<!-- Apply to body or any parent element -->
<body class="hot-toast-dark-theme">
  <!-- All themed toasts inside will use dark mode -->
</body>`;

  readonly themes: ThemeDemo[] = [
    {
      id: 'toast',
      label: 'Default (toast)',
      emoji: '🍞',
      description:
        'The default theme. No extra import required — it comes with the base styles. Use it as the fallback or reset.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles'; // already included`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css"`,
      tsSnippet: `toast.success('Default toast!', { theme: 'toast' });

// Or set globally:
provideHotToastConfig({ theme: 'toast' })`,
      activeTab: 'ts',
      action: () => this.toast.success('Default toast!', { theme: 'toast' }),
    },
    {
      id: 'material',
      label: 'Material',
      emoji: '🎨',
      description:
        'Material Design aesthetic — clean white surface, <b>elevation-2 shadow</b>, 4px radius. Adapts to dark mode automatically.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles';
@use '@ngxpert/hot-toast/themes/material';`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css",
"@ngxpert/hot-toast/themes/material.css"`,
      tsSnippet: `toast.success('Material toast!', { theme: 'material' });`,
      activeTab: 'scss',
      action: () => this.toast.success('Material toast!', { theme: 'material' }),
    },
    {
      id: 'minimal',
      label: 'Minimal',
      emoji: '🤍',
      description:
        'Understated and shadow-free — a <b>subtle border</b>, muted colors and no shadow. Perfect for apps with a clean, content-first design.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles';
@use '@ngxpert/hot-toast/themes/minimal';`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css",
"@ngxpert/hot-toast/themes/minimal.css"`,
      tsSnippet: `toast.info('Minimal toast!', { theme: 'minimal' });`,
      activeTab: 'scss',
      action: () => this.toast.info('Minimal toast!', { theme: 'minimal' }),
    },
    {
      id: 'glassmorphism',
      label: 'Glassmorphism',
      emoji: '🪟',
      description:
        'Frosted-glass effect using <b><code>backdrop-filter: blur(12px)</code></b> with a semi-transparent background. Works best over colourful or image backgrounds.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles';
@use '@ngxpert/hot-toast/themes/glassmorphism';`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css",
"@ngxpert/hot-toast/themes/glassmorphism.css"`,
      tsSnippet: `toast.show('Glassmorphism toast!', { theme: 'glassmorphism', icon: '🪟' });`,
      activeTab: 'scss',
      action: () => this.toast.show('Glassmorphism toast!', { theme: 'glassmorphism', icon: '🪟' }),
    },
    {
      id: 'ios',
      label: 'iOS',
      emoji: '🍎',
      description:
        'iOS-style pill with <b><code>backdrop-filter: blur(20px)</code></b>, rounded corners and a compact layout. Feels right at home in design-heavy apps.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles';
@use '@ngxpert/hot-toast/themes/ios';`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css",
"@ngxpert/hot-toast/themes/ios.css"`,
      tsSnippet: `toast.success('iOS toast!', { theme: 'ios' });`,
      activeTab: 'scss',
      action: () => this.toast.success('iOS toast!', { theme: 'ios' }),
    },
    {
      id: 'snackbar',
      label: 'Snackbar',
      emoji: '🌑',
      description:
        'Dark snackbar variant — included in the base styles, no extra import needed. Pairs well with <b><code>position: bottom-center</code></b>.',
      scssSnippet: `/* styles.scss */
@use '@ngxpert/hot-toast/styles'; // already included`,
      cssSnippet: `/* angular.json styles */
"@ngxpert/hot-toast/styles.css"`,
      tsSnippet: `toast.show('Snackbar toast!', {
  theme: 'snackbar',
  icon: '🌑',
  position: 'bottom-center',
});`,
      activeTab: 'ts',
      action: () => this.toast.show('Snackbar toast!', { theme: 'snackbar', icon: '🌑', position: 'bottom-center' }),
    },
  ];
}
