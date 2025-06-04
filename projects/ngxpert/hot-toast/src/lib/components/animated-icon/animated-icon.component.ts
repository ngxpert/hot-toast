import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../hot-toast.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle],
})
export class AnimatedIconComponent {
  @Input() iconTheme: IconTheme;
}
