import { Component, input } from '@angular/core';
import { IconTheme } from '../../hot-toast.model';
import { Content, DynamicViewDirective } from '@ngneat/overview';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',

  imports: [DynamicViewDirective],
})
export class AnimatedIconComponent {
  readonly iconTheme = input<IconTheme>();
  readonly icon = input<Content>('');
}
