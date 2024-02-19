import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import {
  HotToastClose,
  Toast,
  ToastConfig,
  ToastPosition,
  UpdateToastOptions,
  AddToastRef,
  CreateHotToastRef,
} from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { filter } from 'rxjs/operators';
import { Content } from '@ngneat/overview';
import { HotToastComponent } from '../hot-toast/hot-toast.component';
import { HOT_TOAST_DEPTH_SCALE, HOT_TOAST_DEPTH_SCALE_ADD, HOT_TOAST_MARGIN } from '../../constants';

@Component({
  selector: 'hot-toast-container',
  templateUrl: './hot-toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HotToastComponent],
})
export class HotToastContainerComponent {
  @Input() defaultConfig: ToastConfig;

  @ViewChildren(HotToastComponent) hotToastComponentList: QueryList<HotToastComponent>;

  toasts: Toast<unknown>[] = [];
  toastRefs: CreateHotToastRef<unknown>[] = [];
  isShowingAllToasts = false;

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();

  private onClosed$ = this._onClosed.asObservable();

  constructor(private cdr: ChangeDetectorRef) {}

  trackById(index: number, toast: Toast<unknown>) {
    return toast.id;
  }

  getVisibleToasts(position: ToastPosition) {
    return this.toasts.filter((t) => t.visible && t.position === position);
  }
  calculateOffset(toastId: string, position: ToastPosition) {
    const visibleToasts = this.getVisibleToasts(position);
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset =
      index !== -1
        ? visibleToasts.slice(...(this.defaultConfig.reverseOrder ? [index + 1] : [0, index])).reduce((acc, t, i) => {
            const toastsAfter = visibleToasts.length - 1 - i;
            return this.defaultConfig.visibleToasts !== 0 && i < visibleToasts.length - this.defaultConfig.visibleToasts
              ? 0
              : acc +
                  (this.defaultConfig.stacking === 'vertical' || this.isShowingAllToasts
                    ? t.height || 0
                    : toastsAfter * HOT_TOAST_DEPTH_SCALE + HOT_TOAST_DEPTH_SCALE_ADD) +
                  HOT_TOAST_MARGIN;
          }, 0)
        : 0;
    return offset;
  }

  updateHeight(height: number, toast: Toast<unknown>) {
    toast.height = height;
    this.cdr.detectChanges();
  }

  addToast<DataType>(ref: HotToastRef): AddToastRef<DataType> {
    this.toastRefs.push(ref);

    const toast = ref.getToast();

    this.toasts.push(ref.getToast());

    if (this.defaultConfig.visibleToasts !== 0 && this.toasts.length > this.defaultConfig.visibleToasts) {
      const closeToasts = this.toasts.slice(0, this.toasts.length - this.defaultConfig.visibleToasts);
      closeToasts.forEach((t) => {
        if (t.autoClose) {
          this.closeToast(t.id);
        }
      });
    }

    this.cdr.detectChanges();

    return {
      dispose: () => {
        this.closeToast(toast.id);
      },
      updateMessage: (message: Content) => {
        toast.message = message;
        this.updateToasts(toast);
        this.cdr.detectChanges();
      },
      updateToast: (options: UpdateToastOptions<DataType>) => {
        this.updateToasts(toast, options);
        this.cdr.detectChanges();
      },
      afterClosed: this.getAfterClosed(toast),
    };
  }

  closeToast(id?: string) {
    if (id) {
      const comp = this.hotToastComponentList.find((item) => item.toast.id === id);
      if (comp) {
        comp.close();
      }
    } else {
      this.hotToastComponentList.forEach((comp) => comp.close());
    }
  }

  beforeClosed(toast: Toast<unknown>) {
    toast.visible = false;
  }

  afterClosed(closeToast: HotToastClose) {
    const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this._onClosed.next(closeToast);
      this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
      this.toastRefs = this.toastRefs.filter((t) => t.getToast().id !== closeToast.id);
      this.cdr.detectChanges();
    }
  }

  hasToast(id: string) {
    return this.toasts.findIndex((t) => t.id === id) > -1;
  }

  showAllToasts(show: boolean) {
    this.isShowingAllToasts = show;
  }

  private getAfterClosed(toast: Toast<unknown>) {
    return this.onClosed$.pipe(filter((v) => v.id === toast.id));
  }

  private updateToasts(toast: Toast<unknown>, options?: UpdateToastOptions<unknown>) {
    this.toasts = this.toasts.map((t) => ({ ...t, ...(t.id === toast.id && { ...toast, ...options }) }));
  }
}
