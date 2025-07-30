import { Component } from '@angular/core';
import { CodeComponent } from '../../shared/components/code/code.component';

@Component({
  selector: 'app-toast-container',
  imports: [CodeComponent],
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
  containerSelectorSnippet = `
  import { HOT_TOAST_CONTAINER_TOKEN } from '@ngxpert/hot-toast';

  @Component({
    providers: [
      {
        provide: HOT_TOAST_CONTAINER_TOKEN,
        useValue: '#toast-container',
      },
    ],
  })
  `;
}
