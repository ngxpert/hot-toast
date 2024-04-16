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
import { GroupingComponent } from './sections/grouping/grouping.component';
import { EmojiButtonComponent } from './shared/components/emoji-button/emoji-button.component';
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
    GroupingComponent,
    ReverseOrderComponent,
    FooterComponent,
    EmojiButtonComponent,
  ],
})
export class AppComponent {
  readonly repoUrl = REPO_URL;
  readonly jumpSections: { href: string; emoji: string; label: string }[] = [
    {
      href: '#info',
      emoji: 'ℹ️',
      label: 'Info',
    },
    {
      href: '#success',
      emoji: '✅',
      label: 'Success',
    },
    {
      href: '#warning',
      emoji: '⚠️',
      label: 'Warning',
    },
    {
      href: '#error',
      emoji: '❌',
      label: 'Error',
    },
    {
      href: '#loader',
      emoji: '🔄️',
      label: 'Loader',
    },
    {
      href: '#observe',
      emoji: '⏳',
      label: 'Observe',
    },
    {
      href: '#multi',
      emoji: '↕️',
      label: 'Multi Line',
    },
    {
      href: '#emoji',
      emoji: '👏',
      label: 'Emoji',
    },
    {
      href: '#snackbar',
      emoji: '🌞',
      label: 'Snackbar',
    },
    {
      href: '#dismissible',
      emoji: '❎',
      label: 'dismissible',
    },
    {
      href: '#events',
      emoji: '🔂',
      label: 'Events',
    },
    {
      href: '#themed',
      emoji: '🎨',
      label: 'Themed',
    },
    {
      href: '#toast-ref',
      emoji: '🕵️',
      label: 'Close manually',
    },
    {
      href: '#toast-ref-msg',
      emoji: '🕵️',
      label: 'Update message',
    },
    {
      href: '#only-one-at-a-time',
      emoji: '☝️',
      label: 'One at a Time',
    },
    {
      href: '#persistent',
      emoji: '🔢',
      label: 'Persistent',
    },
    {
      href: '#html',
      emoji: '🔠',
      label: 'HTML',
    },
    {
      href: '#template',
      emoji: '🔩',
      label: 'Template',
    },
    {
      href: '#template-data',
      emoji: '🎫',
      label: 'Template Data',
    },
    {
      href: '#component',
      emoji: '🆕',
      label: 'Component',
    },
    {
      href: '#injector',
      emoji: '💉',
      label: 'Injector',
    },
    {
      href: '#component-data',
      emoji: '💾',
      label: 'Component Data',
    },
    {
      href: '#positions',
      emoji: '🅿️',
      label: 'Positions',
    },
    {
      href: '#stacking',
      emoji: '🪜',
      label: 'Stacking',
    },
    {
      href: '#grouping-pre',
      emoji: '🔔',
      label: 'Pre Grouped',
    },
    {
      href: '#grouping-post',
      emoji: '🔔',
      label: 'Post Grouped',
    },
    {
      href: '#order',
      emoji: '🔀',
      label: 'Order',
    },
  ];

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
