import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
@Component({
  selector: 'app-material-icon',
  template: `<span class="material-symbols-outlined icon-filled">favorite</span>`,
  styles: [
    `
      .icon-filled {
        font-variation-settings: 'FILL' 1;
      }
    `,
  ],
})
export class MaterialIconComponent {
  constructor() {
    // Create a link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';

    // Check if the link already exists to avoid duplicates
    if (!document.head.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }
}

@Component({
  selector: 'app-toast-with-material-icon',
  template: `<button
    (click)="showToast()"
    class="rounded-lg font-bold gap-4 flex bg-gradient-to-b from-toast-50 to-toast-200 shadow-button text-center py-4 px-6 active:translate-y-0.5 active:shadow-button-active active:bg-gray-100 transform focus:outline-none focus:ring-4"
  >
    Show Toast
  </button>`,
})
export class ToastWithMaterialIconComponent {
  private toast = inject(HotToastService);

  showToast() {
    const message = 'Hot toast with Material icon';
    const options = {
      icon: MaterialIconComponent,
    };
    this.toast.show(message, options);
  }
}
