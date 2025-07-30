import { Component } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgClass, NgStyle } from '@angular/common';
// import { Dialog } from '@angular/cdk/dialog';

import { REPO_URL } from '../../core/constants';
import { ReverseOrderComponent } from '../../sections/reverse-order/reverse-order.component';
import { StackingComponent } from '../../sections/stacking/stacking.component';
import { PositionComponent } from '../../sections/position/position.component';
import { ExampleComponent } from '../../sections/example/example.component';
import { StepsComponent } from '../../sections/steps/steps.component';
import { FeaturesComponent } from '../../sections/features/features.component';
import { GroupingComponent } from '../../sections/grouping/grouping.component';
import { RouterLink } from '@angular/router';
import { ToastContainerComponent } from '../../sections/toast-container/toast-container.component';
// import { JumpToDialogComponent } from './shared/components/jump-to-dialog/jump-to-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgClass,
    NgStyle,
    FeaturesComponent,
    StepsComponent,
    ExampleComponent,
    PositionComponent,
    StackingComponent,
    GroupingComponent,
    ReverseOrderComponent,
    RouterLink,
    ToastContainerComponent,
    // JumpToDialogComponent,
  ],
})
export class HomeComponent {
  readonly repoUrl = REPO_URL;
  isDialogOpen = false;

  constructor(
    private toast: HotToastService, // private dialog: Dialog
  ) {}

  // keyDownListener(ev: KeyboardEvent) {
  //   const key = ev.key;
  //   const element = document.querySelector('[data-keyboard-key="' + key.toUpperCase() + '"]');
  //   element.classList.add('active');
  // }

  // keyUpListener(ev: KeyboardEvent) {
  //   const key = ev.key;
  //   const element = document.querySelector('[data-keyboard-key="' + key.toUpperCase() + '"]');
  //   element.classList.remove('active');
  //   if (key === '/') {
  //     ev.preventDefault();
  //     this.openDialog();
  //   }
  // }

  // ngOnInit() {
  //   document.addEventListener('keyup', this.keyUpListener);
  //   document.addEventListener('keydown', this.keyDownListener);
  // }

  // ngOnDestroy() {
  //   document.removeEventListener('keyup', this.keyUpListener);
  //   document.removeEventListener('keydown', this.keyDownListener);
  // }

  // openDialog() {
  //   if (!this.isDialogOpen) {
  //     this.isDialogOpen = true;

  //     const dialogRef = this.dialog.open<string>(JumpToDialogComponent, {
  //       width: '350px',
  //     });

  //     dialogRef.closed.subscribe((result) => {
  //       this.isDialogOpen = false;
  //     });
  //   }
  // }

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
