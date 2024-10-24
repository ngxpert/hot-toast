import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconTheme } from '../../hot-toast.model';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AnimatedIconComponent {
  iconTheme = input<IconTheme>();
}
