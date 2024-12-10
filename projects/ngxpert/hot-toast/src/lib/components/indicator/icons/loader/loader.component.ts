import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconTheme } from '../../../../hot-toast.model';

@Component({
    selector: 'hot-toast-loader',
    templateUrl: './loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class LoaderComponent {
  @Input() theme: IconTheme;
}
