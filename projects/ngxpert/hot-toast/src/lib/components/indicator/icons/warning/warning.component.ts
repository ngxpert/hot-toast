import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-warning',
  templateUrl: './warning.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class WarningComponent {
  theme = input<IconTheme>();
}
