import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeComponent } from '../../shared/components/code/code.component';

@Component({
  selector: 'app-toast-container',
  imports: [CodeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
  containerSelectorSnippet = `
  import { HOT_TOAST_CONTAINER_TOKEN } from '@ngxpert/hot-toast';

  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {
        provide: HOT_TOAST_CONTAINER_TOKEN,
        useValue: '#toast-container',
      },
    ],
  })
  `;
}
