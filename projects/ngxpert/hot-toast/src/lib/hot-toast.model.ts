import { Component, Injector } from '@angular/core';
import { Content } from '@ngneat/overview';
import { Observable } from 'rxjs';
import { HotToastRef } from './hot-toast-ref';

export type ToastStacking = 'vertical' | 'depth';

export class ToastConfig implements DefaultToastOptions {
  /**
   * Sets the reverse order for hot-toast stacking
   *
   * @default false
   */
  reverseOrder = false;

  /**
   * Sets the number of toasts visible.
   * 0 will set no limit.
   * @default 5
   * @since 6.1.0
   */
  visibleToasts = 5;

  /**
   * Sets the type of stacking
   * @default "vertical"
   * @since 6.1.0
   */
  stacking: ToastStacking = 'vertical';

  ariaLive: ToastAriaLive = 'polite';
  role: ToastRole = 'status';
  position: ToastPosition = 'top-center';
  className: string;
  closeStyle: any;
  dismissible: boolean;
  autoClose = true;
  duration: number;
  icon: Content;
  iconTheme: IconTheme;
  style: any;
  theme: ToastTheme = 'toast';
  attributes: Record<string, string> = {};

  // key in ToastType
  info: ToastOptions<unknown> & { content?: Content } = { content: '' };
  success: ToastOptions<unknown> & { content?: Content } = { content: '' };
  error: ToastOptions<unknown> & { content?: Content } = { content: '' };
  loading: ToastOptions<unknown> & { content?: Content } = { content: '' };
  blank: ToastOptions<unknown> & { content?: Content } = { content: '' };
  warning: ToastOptions<unknown> & { content?: Content } = { content: '' };
}

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type IconTheme = {
  primary: string;
  secondary?: string;
};

export type ToastTheme = 'toast' | 'snackbar';

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

const isAngularComponent = (arg: any): boolean => {
  return (
    typeof arg === 'function' && arg.decorators && arg.decorators.some((decorator) => decorator.type === Component)
  );
};

export const resolveValueOrFunction = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
  isAngularComponent(valOrFunction)
    ? (valOrFunction as TValue)
    : isFunction(valOrFunction)
    ? valOrFunction(arg)
    : valOrFunction;

export type ToastRole = 'status' | 'alert';

export type ToastAriaLive = 'assertive' | 'off' | 'polite';

export interface Toast<DataType> {
  type: ToastType;

  /**
   * Unique id to associate with hot-toast.
   * There can't be multiple hot-toasts opened with same id.
   *
   * @default Date.now().toString()
   */
  id: string;

  /** The message to show in the hot-toast. */
  message: Content | undefined;

  /**
   * Role of the live region.
   *
   * @default status
   */
  role: ToastRole;

  /** aria-live value for the live region.
   *
   * @default polite
   */
  ariaLive: ToastAriaLive;

  /**Icon to show in the hot-toast */
  icon?: Content;

  /**
   * Duration in milliseconds after which hot-toast will be auto closed.
   * Can be disabled via `autoClose: false`
   *
   * @default 3000 | error = 4000 | loading = 30000
   */
  duration?: number;

  /**
   * Show close button in hot-toast
   *
   * @default false
   */
  dismissible?: boolean;

  /**
   * Auto close hot-toast after duration
   *
   * @default true
   */
  autoClose?: boolean;

  /**Extra styles to apply for hot-toast */
  style?: any;

  /**Extra CSS classes to be added to the hot toast container. */
  className?: string;

  /**Extra attribute to be added to the hot toast container. */
  attributes?: Record<string, string>;

  /**Use this to change icon color */
  iconTheme?: IconTheme;

  /**
   * Visual appearance of hot-toast
   *
   * @default toast
   */
  theme?: ToastTheme;

  /**
   * The position to place the hot-toast.
   *
   *  @default top-center
   */
  position?: ToastPosition;

  /**Extra styles to apply for close button */
  closeStyle?: any;

  createdAt: number;
  visible: boolean;
  height?: number;

  observableMessages?: ObservableMessages<unknown, DataType>;

  /**
   * Useful when you want to keep a persistance for toast based on ids, across sessions.
   *
   * @example
   * // Lets say you want show hot-toast, with a particular id,
   * // max 3 times to a user irrespective of browser session.
   * // In this case you will set this as:
   * { enabled: true, count: 3 }
   *
   * @type {ToastPersistConfig}
   */
  persist?: ToastPersistConfig;

  /**
   * Allows you to pass injector for your component
   *
   * @since 1.1.0
   * @type {Injector}
   * @memberof Toast
   */
  injector?: Injector;

  /**
   * Allows you to pass data for your component/template
   *
   * @since 2.0.0
   * @type {DataType}
   * @memberof Toast
   */
  data?: DataType;

  group?: { children?: { options: Toast<unknown> }[], parent?: CreateHotToastRef<unknown> };
}

export type ToastOptions<DataType> = Partial<
  Pick<
    Toast<DataType>,
    | 'id'
    | 'icon'
    | 'duration'
    | 'dismissible'
    | 'autoClose'
    | 'role'
    | 'ariaLive'
    | 'className'
    | 'style'
    | 'iconTheme'
    | 'theme'
    | 'position'
    | 'closeStyle'
    | 'persist'
    | 'injector'
    | 'data'
    | 'attributes'
    | 'group'
  >
>;

export type DefaultToastOptions = ToastOptions<unknown> & {
  [key in ToastType]?: ToastOptions<unknown> & { content?: Content };
};

export type ObservableLoading<DataType> = {
  content: Content;
} & ToastOptions<DataType>;

export type ObservableSuccessOrError<T, DataType> = {
  content: ValueOrFunction<Content, T>;
} & ToastOptions<DataType>;

export type ObservableMessages<T, DataType> = {
  loading?: Content | ObservableLoading<DataType>;
  success?: ValueOrFunction<Content, T> | ObservableSuccessOrError<T, DataType>;
  error?: ValueOrFunction<Content, any> | ObservableSuccessOrError<any, DataType>;
};

export interface HotToastServiceMethods {
  show<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown>;
  error<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown>;
  success<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown>;
  loading<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown>;
  warning<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown>;
  observe<T, DataType>(messages: ObservableMessages<T, DataType>): (source: Observable<T>) => Observable<T>;
  close(id?: string): void;
}

export type UpdateToastOptions<DataType> = Partial<
  Pick<
    Toast<DataType>,
    'icon' | 'duration' | 'dismissible' | 'className' | 'style' | 'iconTheme' | 'type' | 'theme' | 'closeStyle'
  >
>;

export interface HotToastRefProps<DataType> {
  /** Returns all the toast options */
  getToast: () => Toast<DataType>;
  dispose: () => void;
  /**Updates only message */
  updateMessage: (message: Content) => void;
  /**Update updatable options of toast */
  updateToast: (options: UpdateToastOptions<DataType>) => void;
  /** Observable for notifying the user that the toast has been closed. */
  afterClosed: Observable<HotToastClose>;
  afterGroupItemClosed?: Observable<HotToastClose>;
  /**Closes the toast */
  close: (closeData?: { dismissedByAction: boolean }) => void;
  /**
   * @since 2.0.0
   */
  data: DataType;
  groupRefs: CreateHotToastRef<unknown>[];
}

/** Event that is emitted when a snack bar is dismissed. */
export interface HotToastClose {
  /** Whether the snack bar was dismissed using the action button. */
  dismissedByAction: boolean;
  id: string;
}

export class ToastPersistConfig {
  /**
   *In which storage id vs. counts should be stored
   *
   * @type {('local' | 'session')}
   * @memberof ToastPersistConfig
   * @default 'local'
   */
  storage?: 'local' | 'session' = 'local';

  /**
   *The key pattern to store object in storage. `${id}` in pattern is replaced with actual toast id.
   *
   * @type {('local' | 'session')}
   * @memberof ToastPersistConfig
   * @default 'ngxpert/hottoast-${id}'
   */
  key?: string = 'ngxpert/hototast-${id}';

  /**
   *The number of toasts allowed to show.
   *
   * @memberof ToastPersistConfig
   * @default 1
   */
  count? = 1;

  enabled = false;
}

export type AddToastRef<DataType> = Pick<
  HotToastRefProps<DataType>,
  'afterClosed' | 'dispose' | 'updateMessage' | 'updateToast' | 'groupRefs'
>;

export type CreateHotToastRef<DataType> = Omit<Omit<HotToastRefProps<DataType>, 'appendTo'>, 'dispose'>;

export type DefaultDataType = Record<string, any>;
