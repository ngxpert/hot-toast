import { Component, input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-warning',
  templateUrl: './warning.component.html',
})
export class WarningComponent {
  readonly theme = input<IconTheme>();
}
