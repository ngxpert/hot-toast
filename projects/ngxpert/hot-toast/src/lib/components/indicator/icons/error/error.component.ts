import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-error',
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ErrorComponent {
  @Input() theme: IconTheme;
}
