import {
  Component,
  inject,
  TemplateRef,
  viewChild,
  signal,
  OnDestroy,
  DestroyRef,
  computed,
  effect,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateHotToastRef, HotToastRef, HotToastService } from '@ngxpert/hot-toast';
import { DOCUMENT } from '@angular/common';

type ToastData = {
  title: string;
  message?: string;
  duration: number;
  isExpandable: boolean;
  showConfirmation?: boolean;
};

@Component({
  selector: 'app-expandable-notification-toast-with-timer',
  templateUrl: './expandable-notification-toast-with-timer.component.html',
  styleUrls: ['./expandable-notification-toast-with-timer.component.scss'],
})
export class ExpandableNotificationToastWithTimerComponent implements OnDestroy {
  private toast = inject(HotToastService);
  private toastTemplate = viewChild<TemplateRef<unknown>>('toastTemplate');
  private destroyRef = inject(DestroyRef);
  private currentToastRef: CreateHotToastRef<ToastData | unknown> | undefined;
  private document = inject(DOCUMENT);
  // Toast state management
  isExpanded = signal(false);
  isTimerStopped = signal(false);
  remainingTime = signal(0);
  pauseTimer = signal(false);

  private timerInterval: number | null = null;

  expandableContentHeight = computed(() => {
    const expandableContent = this.document.querySelector('[data-expandable]') as HTMLElement;
    return this.isExpanded() ? expandableContent?.scrollHeight + 1 + 'px' : '0px';
  });

  constructor() {
    effect(() => {
      if (this.pauseTimer()) {
        this.clearTimer();
      } else {
        this.startTimer();
      }
    });
  }

  showToast() {
    const toastData: ToastData = {
      title: 'Changes saved',
      message:
        'Are you sure you would like to remove this user? If the user is an active member of your team, their account will be deleted. This action cannot be undone.',
      duration: 15000, // 15 seconds
      isExpandable: true,
      showConfirmation: true,
    };

    this.remainingTime.set(Math.ceil(toastData.duration / 1000));
    this.isTimerStopped.set(false);
    this.isExpanded.set(false);

    this.currentToastRef = this.toast.show<ToastData>(this.toastTemplate(), {
      duration: toastData.duration,
      // setting id allows to open only one toast at a time
      id: 'expandable-notification-toast-with-timer',
      style: {
        '--hot-toast-padding': '0',
        '--hot-toast-message-margin': '0',
        '--hot-toast-border-radius': '16px',
        '--hot-toast-shadow': 'none',
        '--hot-toast-max-width': '350px',
        width: '350px',
      },
      data: toastData,
    });

    this.currentToastRef.afterClosed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.clearTimer());

    // toast takes 350ms to be visible completely, so we need to wait for it to render before starting the timer
    setTimeout(() => {
      this.startTimer();
    }, 350);
  }

  private startTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = window.setInterval(() => {
      if (this.isTimerStopped()) {
        return;
      }

      const current = this.remainingTime();
      if (current < 1) {
        return;
      }

      this.remainingTime.set(current - 1);
    }, 1000);
  }

  toggleExpanded(): void {
    this.isExpanded.update((expanded) => !expanded);
  }

  stopTimer(): void {
    this.currentToastRef?.updateToast({ duration: Infinity });
    this.isTimerStopped.set(true);
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleConfirmAction(toastRef: HotToastRef<ToastData>): void {
    // Handle the "Okay" button action
    toastRef.close({ dismissedByAction: true });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
