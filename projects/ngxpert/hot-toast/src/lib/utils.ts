import { Renderer2 } from '@angular/core';

export const animate = (renderer: Renderer2, element: HTMLElement, animation: string) => {
  renderer.setStyle(element, 'animation', animation);
};
