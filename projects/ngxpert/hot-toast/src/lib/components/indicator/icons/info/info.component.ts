import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-info',
  templateUrl: './info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InfoComponent {
  @Input() theme: IconTheme;
}
