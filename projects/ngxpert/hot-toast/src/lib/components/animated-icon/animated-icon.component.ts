import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../hot-toast.model';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AnimatedIconComponent {
  @Input() iconTheme: IconTheme;
}
