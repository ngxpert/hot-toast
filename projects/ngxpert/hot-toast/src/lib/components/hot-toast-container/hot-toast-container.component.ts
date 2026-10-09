import {
  Component,
  inject,
  ChangeDetectorRef,
  input,
  afterNextRender,
  ElementRef,
  OnDestroy,
  isDevMode,
  viewChildren,
  signal,
  NgZone,
  Injector,
  DOCUMENT,
} from '@angular/core';
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
  styleUrl: './hot-toast-container.component.scss',

  imports: [HotToastComponent],
  host: {
    '[attr.popover]': 'defaultConfig().usePopover ? "manual" : undefined',
    '[class.hot-toast-container-overlay-popover]': 'defaultConfig().usePopover',
    '(mouseout)': 'trackPointer($event)',
  },
})
export class HotToastContainerComponent implements OnDestroy {
  readonly defaultConfig = input.required<ToastConfig>();

  readonly hotToastComponentList = viewChildren(HotToastComponent);

  toasts: Toast<unknown>[] = [];
  toastRefs: CreateHotToastRef<unknown>[] = [];
  readonly isShowingAllToasts = signal(false);

  /** Last pointer position over a toast, in viewport coordinates. */
  private pointer?: { x: number; y: number };
  /** Set while a closing toast's `mouseleave` is being verified; stops the verification. */
  private stopVerifyingLeave?: VoidFunction;

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();

  /** Subject for notifying the user that the toast has been expanded or collapsed. */
  private _onGroupToggle = new Subject<HotToastGroupEvent>();

  /** Subject for notifying the user that the group refs have been attached to toast. */
  private _onGroupRefAttached = new Subject<{ groupRefs: CreateHotToastRef<unknown>[]; id: string }>();

  private onClosed$ = this._onClosed.asObservable();
  private onGroupToggle$ = this._onGroupToggle.asObservable();
  private onGroupRefAttached$ = this._onGroupRefAttached.asObservable();

  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(HotToastService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private ngZone = inject(NgZone);
  private injector = inject(Injector);
  private document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      if (this.defaultConfig()?.usePopover) {
        // We need the try/catch because the browser will throw if the
        // host or any of the parents are outside the DOM. Also note
        // the string access which is there for compatibility with Closure.
        try {
          this.host.nativeElement['showPopover']();
        } catch (error) {
          if (isDevMode()) {
            console.error('Error showing popover');
            console.error(error);
          }
        }
      }
    });
  }

  trackById(index: number, toast: Toast<unknown>) {
    return toast.id;
  }

  getVisibleToasts(position: ToastPosition) {
    return this.unGroupedToasts.filter((t) => t.visible && t.position === position);
  }

  /**
   * Depth of a toast: how many toasts are stacked after it. Counted, not derived from the index in `toasts`: that
   * list also holds closing toasts (until their exit animation ends) and toasts of other positions.
   */
  getToastsAfter(toast: Toast<unknown>) {
    const after = this.toasts.slice(this.toasts.findIndex((t) => t.id === toast.id) + 1);
    if (toast.autoClose) return after.length;
    const visibleToasts = this.getVisibleToasts(toast.position!);
    return after.filter((t) => visibleToasts.includes(t)).length;
  }

  get unGroupedToasts() {
    return this.toasts.filter(
      (t) => t.group?.parent === undefined || t.group?.children === undefined || t.group?.children.length === 0,
    );
  }

  calculateOffset(toastId: string, position: ToastPosition | undefined) {
    const visibleToasts = this.getVisibleToasts(position ?? 'top-center');
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset =
      index !== -1
        ? visibleToasts
            .slice(...(this.defaultConfig()?.reverseOrder ? [index + 1] : [0, index]))
            .reduce((acc, t, i) => {
              const defaultConfig = this.defaultConfig();
              const absoluteIndex = defaultConfig?.reverseOrder ? index + 1 + i : i;
              const toastsAfter = visibleToasts.length - 1 - absoluteIndex;
              return defaultConfig?.visibleToasts !== 0 &&
                absoluteIndex < visibleToasts.length - (defaultConfig?.visibleToasts ?? 0)
                ? 0
                : acc +
                    (defaultConfig?.stacking === 'vertical' || this.isShowingAllToasts()
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

    let toast = ref.getToast();

    this.toasts.push(ref.getToast());

    if (
      this.defaultConfig()?.visibleToasts !== 0 &&
      this.unGroupedToasts.length > (this.defaultConfig()?.visibleToasts ?? 0)
    ) {
      const closeToasts = this.toasts.slice(0, this.toasts.length - (this.defaultConfig()?.visibleToasts ?? 0));
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
        toast = { ...toast, ...options };
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
    skipAttachToParent?: boolean,
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
      const items = toast.group?.children;
      const allPromises: Promise<CreateHotToastRef<unknown> | null>[] = (items || []).map((item) => {
        return new Promise<CreateHotToastRef<unknown> | null>((innerResolve) => {
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
      Promise.all(allPromises).then((refs) =>
        resolve(refs.filter((ref): ref is CreateHotToastRef<unknown> => ref !== null)),
      );
    });
  }

  closeToast(id?: string) {
    if (id) {
      const comp = this.hotToastComponentList().find((item) => item.toast().id === id);
      if (comp) {
        comp.close();
        this.cdr.markForCheck();
      }
    } else {
      this.hotToastComponentList().forEach((comp) => comp.close());
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
      if (this.stopVerifyingLeave) {
        // The closed toast is out of the DOM after this render: decide with what is left under the pointer.
        afterNextRender(() => this.verifyLeave(), { injector: this.injector });
      }
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

  /**
   * `mouseout` bubbles here from a toast right before its `mouseleave`, also when the toast loses pointer events under
   * a still pointer, so it carries the position the pointer left the toast at.
   */
  trackPointer(event: MouseEvent) {
    this.pointer = { x: event.clientX, y: event.clientY };
  }

  showAllToasts(show: boolean, toast?: Toast<unknown>) {
    if (!show && toast && !toast.visible) {
      // A closing toast loses pointer events at exit start, which fires `mouseleave` under a still pointer, and the
      // toast sliding into its slot gets no `mouseenter` until the closed one leaves the DOM: verify the leave instead.
      this.verifyLeaveUntilPointerLeaves();
      return;
    }
    this.stopVerifyingLeave?.();
    this.isShowingAllToasts.set(show);
  }

  private verifyLeaveUntilPointerLeaves() {
    if (this.stopVerifyingLeave) return;
    // The closing toast is no longer hit-testable, so the pointer is followed on the document until it is removed.
    const onMove = (event: MouseEvent) => {
      this.pointer = { x: event.clientX, y: event.clientY };
      this.verifyLeave();
    };
    this.ngZone.runOutsideAngular(() => this.document.addEventListener('mousemove', onMove));
    this.stopVerifyingLeave = () => {
      this.document.removeEventListener('mousemove', onMove);
      this.stopVerifyingLeave = undefined;
    };
    this.verifyLeave();
  }

  /** Collapses once the pointer is outside every toast; stops once no toast is closing (hover works again then). */
  private verifyLeave() {
    if (!this.stopVerifyingLeave) return;
    if (!this.isPointerOverAToast()) {
      this.stopVerifyingLeave();
      this.ngZone.run(() => this.isShowingAllToasts.set(false));
    } else if (!this.toasts.some((t) => !t.visible && !t.group?.parent)) {
      // Closed group children stay in `toasts` with `visible: false` for good, hence the parent check.
      this.stopVerifyingLeave();
    }
  }

  /** A closing toast still counts: the toast sliding into its slot is under the pointer by the time it is removed. */
  private isPointerOverAToast() {
    const pointer = this.pointer;
    if (!pointer) return false;
    const wrappers = this.host.nativeElement.querySelectorAll<HTMLElement>('.hot-toast-bar-base-wrapper');
    return Array.from(wrappers).some((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      return pointer.x >= rect.left && pointer.x <= rect.right && pointer.y >= rect.top && pointer.y <= rect.bottom;
    });
  }

  ngOnDestroy() {
    // Removes the document `mousemove` listener of a leave verification still in progress.
    this.stopVerifyingLeave?.();
    if (this.defaultConfig()?.usePopover) {
      // We need the try/catch because the browser will throw if the
      // host or any of the parents are outside the DOM. Also note
      // the string access which is there for compatibility with Closure.
      try {
        this.host.nativeElement['hidePopover']();
      } catch (error) {
        if (isDevMode()) {
          console.error('Error hiding popover');
          console.error(error);
        }
      }
    }
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
