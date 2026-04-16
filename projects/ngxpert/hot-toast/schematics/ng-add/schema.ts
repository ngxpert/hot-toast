export type HotToastThemeOption = 'none' | 'material' | 'minimal' | 'glassmorphism' | 'ios';

export interface Schema {
  /** Name of the project. */
  project: string;

  /**
   * Built-in visual theme to apply for hot-toast.
   * Adds the corresponding theme import to your styles.
   * @default 'none'
   */
  theme?: HotToastThemeOption;
}
