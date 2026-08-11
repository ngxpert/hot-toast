import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { REPO_URL } from '../../core/constants';
import { ReverseOrderComponent } from '../../sections/reverse-order/reverse-order.component';
import { StackingComponent } from '../../sections/stacking/stacking.component';
import { PositionComponent } from '../../sections/position/position.component';
import { ExampleComponent } from '../../sections/example/example.component';
import { StepsComponent } from '../../sections/steps/steps.component';
import { FeaturesComponent } from '../../sections/features/features.component';
import { GroupingComponent } from '../../sections/grouping/grouping.component';
import { RouterLink } from '@angular/router';
import { HttpInterceptorDocComponent } from '../../sections/http-interceptor-doc/http-interceptor-doc.component';
import { ToastContainerComponent } from '../../sections/toast-container/toast-container.component';
import { PopoverComponent } from '../../sections/popover/popover.component';
import { ThemesComponent } from '../../sections/themes/themes.component';
import { FormIntegrationComponent } from '../../sections/form-integration/form-integration.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  imports: [
    FeaturesComponent,
    StepsComponent,
    ExampleComponent,
    PositionComponent,
    StackingComponent,
    GroupingComponent,
    ReverseOrderComponent,
    RouterLink,
    ToastContainerComponent,
    HttpInterceptorDocComponent,
    PopoverComponent,
    ThemesComponent,
    FormIntegrationComponent,
  ],
})
export class HomeComponent {
  private toast = inject(HotToastService);

  readonly repoUrl = REPO_URL;
  isDialogOpen = false;

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
        catchError((error) => of(error)),
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
