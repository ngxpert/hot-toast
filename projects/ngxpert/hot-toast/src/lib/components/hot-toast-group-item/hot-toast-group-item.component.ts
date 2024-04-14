import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, NgZone, Renderer2 } from '@angular/core';
import { HotToastComponent } from '../hot-toast/hot-toast.component';
import { NgClass, NgStyle } from '@angular/common';
import { AnimatedIconComponent } from '../animated-icon/animated-icon.component';
import { IndicatorComponent } from '../indicator/indicator.component';

@Component({
  selector: 'hot-toast-group-item',
  templateUrl: 'hot-toast-group-item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, AnimatedIconComponent, IndicatorComponent],
})
export class HotToastGroupItemComponent extends HotToastComponent {
  constructor(injector: Injector, renderer: Renderer2, ngZone: NgZone, cdr: ChangeDetectorRef) {
    super(injector, renderer, ngZone, cdr);
  }
}
