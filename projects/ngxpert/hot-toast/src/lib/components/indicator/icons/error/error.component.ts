import { Component, input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  readonly theme = input<IconTheme>();
}
