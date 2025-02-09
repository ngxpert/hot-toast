import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-toast-with-line-indicator',
  templateUrl: './toast-with-line-indicator.component.html',
  styleUrls: ['./toast-with-line-indicator.component.scss'],
})
export class ToastWithLineIndicatorComponent {
  private toast = inject(HotToastService);
  private toastTemplate = viewChild<TemplateRef<unknown>>('toastTemplate');

  showToast() {
    this.toast.show(this.toastTemplate(), {
      style: {
        '--hot-toast-padding': '0',
        '--hot-toast-message-margin': '0',
      },
    });
  }
}
