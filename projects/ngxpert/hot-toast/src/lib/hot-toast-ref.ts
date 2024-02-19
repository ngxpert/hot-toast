import { Content } from '@ngneat/overview';
import { Observable, race, Subject } from 'rxjs';

// This should be a `type` import since it causes `ng-packagr` compilation to fail because of a cyclic dependency.
import type { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HotToastClose, Toast, UpdateToastOptions, HotToastRefProps, DefaultDataType } from './hot-toast.model';

export class HotToastRef<DataType = DefaultDataType> implements HotToastRefProps<DataType> {
  updateMessage: (message: Content) => void;
  updateToast: (options: UpdateToastOptions<DataType>) => void;
  afterClosed: Observable<HotToastClose>;

  private _dispose: () => void;

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();

  constructor(private toast: Toast<DataType>) {}

  set data(data: DataType) {
    this.toast.data = data;
  }

  get data() {
    return this.toast.data;
  }

  set dispose(value: () => void) {
    this._dispose = value;
  }

  getToast() {
    return this.toast;
  }

  /**Used for internal purpose
   * Attach ToastRef to container
   */
  appendTo(container: HotToastContainerComponent) {
    const { dispose, updateMessage, updateToast, afterClosed } = container.addToast(this);

    this.dispose = dispose;
    this.updateMessage = updateMessage;
    this.updateToast = updateToast;
    this.afterClosed = race(this._onClosed.asObservable(), afterClosed);
    return this;
  }

  /**
   * Closes the toast
   *
   * @param [closeData={ dismissedByAction: false }] -
   * Make sure to pass { dismissedByAction: true } when closing from template
   * @memberof HotToastRef
   */
  close(closeData: { dismissedByAction: boolean } = { dismissedByAction: false }) {
    this._dispose();
    this._onClosed.next({ dismissedByAction: closeData.dismissedByAction, id: this.toast.id });
    this._onClosed.complete();
  }
}
