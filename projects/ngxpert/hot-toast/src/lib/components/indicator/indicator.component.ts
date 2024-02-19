import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconTheme, ToastType } from '../../hot-toast.model';
import { LoaderComponent } from './icons/loader/loader.component';
import { ErrorComponent } from './icons/error/error.component';
import { CheckMarkComponent } from './icons/checkmark/checkmark.component';
import { WarningComponent } from './icons/warning/warning.component';
import { InfoComponent } from './icons/info/info.component';

@Component({
  selector: 'hot-toast-indicator',
  templateUrl: 'indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LoaderComponent, ErrorComponent, CheckMarkComponent, WarningComponent, InfoComponent],
})
export class IndicatorComponent {
  @Input() theme: IconTheme;
  @Input() type: ToastType;
}
