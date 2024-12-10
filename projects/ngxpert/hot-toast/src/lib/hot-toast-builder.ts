import { Content } from '@ngneat/overview';
import { CreateHotToastRef, ToastOptions } from './hot-toast.model';
import { HotToastService } from './hot-toast.service';
import { Observable } from 'rxjs';

type ToastMethod = 'show' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export class HotToastBuilder<DataType = unknown> {
  private options: ToastOptions<DataType>;
  private groupChildren: HotToastBuilder<unknown>[] = [];
  private toastRef: CreateHotToastRef<DataType>;

  constructor(private message: Content, private service: HotToastService) {
    this.options = {};
  }

  setOptions(options: ToastOptions<DataType>): this {
    this.options = { ...this.options, ...options };
    return this;
  }

  addChild(child: HotToastBuilder<unknown>): this {
    this.groupChildren.push(child);
    return this;
  }

  get afterGroupRefsAttached(): Observable<CreateHotToastRef<unknown>[]> {
    return this.toastRef?.afterGroupRefsAttached;
  }

  private addChildrenToOptions() {
    if (this.groupChildren.length > 0) {
      const children = this.groupChildren.map((child) => ({
        options: {
          message: child.message,
          ...child.options,
        },
      }));

      this.options.group = {
        ...this.options.group,
        children,
      };
    }
  }

  // Create method that creates but doesn't show the toast. Call show() to show the toast.
  create(method: ToastMethod = 'show'): CreateHotToastRef<DataType> {
    this.addChildrenToOptions();
    this.toastRef = this.service[method](this.message, {
      ...this.options,
      ...{ visible: false },
    }) as CreateHotToastRef<DataType>;
    return this.toastRef;
  }

  private createToast(method: ToastMethod): CreateHotToastRef<DataType> {
    this.addChildrenToOptions();
    this.toastRef = this.service[method](this.message, this.options) as CreateHotToastRef<DataType>;
    return this.toastRef;
  }

  show(): CreateHotToastRef<DataType> {
    return this.createToast('show');
  }

  success(): CreateHotToastRef<DataType> {
    return this.createToast('success');
  }

  error(): CreateHotToastRef<DataType> {
    return this.createToast('error');
  }

  warning(): CreateHotToastRef<DataType> {
    return this.createToast('warning');
  }

  info(): CreateHotToastRef<DataType> {
    return this.createToast('info');
  }

  loading(): CreateHotToastRef<DataType> {
    return this.createToast('loading');
  }
}
