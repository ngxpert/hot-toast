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
  HotToastGroupEvent,
} from '../../hot-toast.model';
import { HotToastRef } from '../../hot-toast-ref';
import { filter, map } from 'rxjs/operators';
import { Content } from '@ngneat/overview';
import { HotToastComponent } from '../hot-toast/hot-toast.component';
import { HOT_TOAST_DEPTH_SCALE, HOT_TOAST_DEPTH_SCALE_ADD, HOT_TOAST_MARGIN } from '../../constants';
import { HotToastService } from '../../hot-toast.service';

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

  /** Subject for notifying the user that the toast has been expanded or collapsed. */
  private _onGroupToggle = new Subject<HotToastGroupEvent>();

  /** Subject for notifying the user that the group refs have been attached to toast. */
  private _onGroupRefAttached = new Subject<{ groupRefs: CreateHotToastRef<unknown>[]; id: string }>();

  private onClosed$ = this._onClosed.asObservable();
  private onGroupToggle$ = this._onGroupToggle.asObservable();
  private onGroupRefAttached$ = this._onGroupRefAttached.asObservable();

  constructor(private cdr: ChangeDetectorRef, private toastService: HotToastService) {}

  trackById(index: number, toast: Toast<unknown>) {
    return toast.id;
  }

  getVisibleToasts(position: ToastPosition) {
    return this.unGroupedToasts.filter((t) => t.visible && t.position === position);
  }

  get unGroupedToasts() {
    return this.toasts.filter(
      (t) => t.group?.parent === undefined || t.group?.children === undefined || t.group?.children.length === 0
    );
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
    this.cdr.markForCheck();
  }

  addToast<DataType>(ref: HotToastRef<DataType>, skipAttachToParent?: boolean): AddToastRef<DataType> {
    this.toastRefs.push(ref);

    const toast = ref.getToast();

    this.toasts.push(ref.getToast());

    if (this.defaultConfig.visibleToasts !== 0 && this.unGroupedToasts.length > this.defaultConfig.visibleToasts) {
      const closeToasts = this.toasts.slice(0, this.toasts.length - this.defaultConfig.visibleToasts);
      closeToasts.forEach((t) => {
        if (t.autoClose) {
          this.closeToast(t.id);
        }
      });
    }

    this.cdr.markForCheck();

    this.attachGroupRefs<DataType>(toast, ref, skipAttachToParent);

    return {
      dispose: () => {
        this.closeToast(toast.id);
      },
      updateMessage: (message: Content) => {
        toast.message = message;
        this.updateToasts(toast);
        this.cdr.markForCheck();
      },
      updateToast: (options: UpdateToastOptions<DataType>) => {
        this.updateToasts(toast, options);
        this.cdr.markForCheck();
      },
      afterClosed: this.getAfterClosed(toast),
      afterGroupToggled: this.getAfterGroupToggled(toast),
      afterGroupRefsAttached: this.getAfterGroupRefsAttached(toast).pipe(map((v) => v.groupRefs)),
    };
  }

  private async attachGroupRefs<DataType>(
    toast: Toast<DataType>,
    ref: HotToastRef<DataType>,
    skipAttachToParent?: boolean
  ) {
    let groupRefs: CreateHotToastRef<unknown>[] = [];

    if (toast.group) {
      if (toast.group.children) {
        groupRefs = await this.createGroupRefs(toast, ref);
        const toastIndex = this.toastRefs.findIndex((t) => t.getToast().id === toast.id);

        if (toastIndex > -1) {
          (this.toastRefs[toastIndex] as { groupRefs: CreateHotToastRef<unknown>[] }).groupRefs = groupRefs;

          this.cdr.markForCheck();
          this._onGroupRefAttached.next({ groupRefs, id: toast.id });
        }
      } else if (toast.group.parent && !skipAttachToParent) {
        const parentToastRef = toast.group.parent;
        const parentToast = parentToastRef.getToast();

        const parentToastRefIndex = this.toastRefs.findIndex((t) => t.getToast().id === parentToast.id);
        const parentToastIndex = this.toasts.findIndex((t) => t.id === parentToast.id);

        if (parentToastRefIndex > -1 && parentToastIndex > -1) {
          this.toastRefs[parentToastRefIndex].groupRefs.push(ref);

          const existingGroup = this.toasts[parentToastRefIndex].group ?? {};
          const existingChildren = this.toasts[parentToastRefIndex].group?.children ?? [];

          existingChildren.push({ options: { ...toast, type: toast.type, message: toast.message } });
          existingGroup.children = existingChildren;

          this.toasts[parentToastRefIndex].group = { ...existingGroup };

          this.cdr.markForCheck();

          this._onGroupRefAttached.next({ groupRefs, id: parentToast.id });
        }
      }
    }
  }

  private createGroupRefs<DataType>(toast: Toast<DataType>, ref: HotToastRef<DataType>) {
    const skipAttachToParent = true;
    return new Promise<CreateHotToastRef<unknown>[]>((resolve) => {
      const items = toast.group.children;
      const allPromises: Promise<CreateHotToastRef<unknown>>[] = items.map((item) => {
        return new Promise((innerResolve) => {
          item.options.group = { parent: ref };
          // We need to give a tick's delay so that IDs are generated properly
          setTimeout(() => {
            try {
              const itemRef = this.toastService.show(item.options.message, item.options, skipAttachToParent);
              innerResolve(itemRef);
            } catch (error) {
              console.error('Error creating toast', error);
              innerResolve(null);
            }
          });
        });
      });
      Promise.all(allPromises).then((refs) => resolve(refs));
    });
  }

  closeToast(id?: string) {
    if (id) {
      const comp = this.hotToastComponentList.find((item) => item.toast.id === id);
      if (comp) {
        comp.close();
        this.cdr.markForCheck();
      }
    } else {
      this.hotToastComponentList.forEach((comp) => comp.close());
      this.cdr.markForCheck();
    }
  }

  beforeClosed(toast: Toast<unknown>) {
    toast.visible = false;
    this.cdr.markForCheck();
  }

  afterClosed(closeToast: HotToastClose) {
    const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this._onClosed.next(closeToast);
      this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
      this.toastRefs = this.toastRefs.filter((t) => t.getToast().id !== closeToast.id);
      this.cdr.markForCheck();
    }
  }

  toggleGroup(groupEvent: HotToastGroupEvent) {
    const toastIndex = this.toastRefs.findIndex((t) => t.getToast().id === groupEvent.id);
    if (toastIndex > -1) {
      this._onGroupToggle.next(groupEvent);
      (this.toastRefs[toastIndex] as { groupExpanded: boolean }).groupExpanded = groupEvent.event === 'expand';
      this.cdr.markForCheck();
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

  private getAfterGroupToggled(toast: Toast<unknown>) {
    return this.onGroupToggle$.pipe(filter((v) => v.id === toast.id));
  }

  private getAfterGroupRefsAttached(toast: Toast<unknown>) {
    return this.onGroupRefAttached$.pipe(filter((v) => v.id === toast.id));
  }

  private updateToasts(toast: Toast<unknown>, options?: UpdateToastOptions<unknown>) {
    this.toasts = this.toasts.map((t) => ({ ...t, ...(t.id === toast.id && { ...toast, ...options }) }));
    this.cdr.markForCheck();
  }
}
