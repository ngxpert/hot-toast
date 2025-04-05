import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() theme: IconTheme;
}
