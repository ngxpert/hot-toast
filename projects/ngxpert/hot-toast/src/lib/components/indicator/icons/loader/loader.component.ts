import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent {
  theme = input<IconTheme>();
}
