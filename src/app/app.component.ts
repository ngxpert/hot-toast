import { Component } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { REPO_URL } from './core/constants';
import { FooterComponent } from './sections/footer/footer.component';
import { ReverseOrderComponent } from './sections/reverse-order/reverse-order.component';
import { StackingComponent } from './sections/stacking/stacking.component';
import { PositionComponent } from './sections/position/position.component';
import { ExampleComponent } from './sections/example/example.component';
import { StepsComponent } from './sections/steps/steps.component';
import { FeaturesComponent } from './sections/features/features.component';
import { NgClass } from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        FeaturesComponent,
        StepsComponent,
        ExampleComponent,
        PositionComponent,
        StackingComponent,
        ReverseOrderComponent,
        FooterComponent,
    ],
})
export class AppComponent {
  readonly repoUrl = REPO_URL;

  constructor(private toast: HotToastService) {}

  observe() {
    const promise = new Promise((res, rej) => {
      if (Math.random() < 0.85) {
        setTimeout(res, 2000);
      } else {
        setTimeout(rej, 2000);
      }
    });
    from(promise)
      .pipe(
        this.toast.observe({
          loading: { content: 'Preparing toast', style: { width: '200px' } },
          error: { content: 'Whoops, it burnt', style: { width: '200px' } },
          success: { content: `Here's your toast`, style: { width: '200px' } },
        }),
        catchError((error) => of(error))
      )
      .subscribe();
  }
}

@Component({
    selector: 'app-icon',
    template: '✋',
    standalone: true,
})
export class IconComponent {}
@Component({
    selector: 'app-msg',
    template: 'Hey, how are you?',
    standalone: true,
})
export class MessageComponent {}
