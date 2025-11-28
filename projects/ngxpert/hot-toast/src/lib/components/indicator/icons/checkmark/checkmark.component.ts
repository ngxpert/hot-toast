import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-checkmark',
  templateUrl: './checkmark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CheckMarkComponent {
  readonly theme = input<IconTheme>();
}
