import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  NgZone,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  signal,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { AnimatedIconComponent } from '../animated-icon/animated-icon.component';
import { IndicatorComponent } from '../indicator/indicator.component';
import { DynamicViewDirective, isComponent, isTemplateRef } from '@ngneat/overview';
import { ENTER_ANIMATION_DURATION, EXIT_ANIMATION_DURATION, HOT_TOAST_DEPTH_SCALE } from '../../constants';
import { HotToastRef } from '../../hot-toast-ref';
import { Toast, ToastConfig, CreateHotToastRef, HotToastClose, HotToastGroupEvent } from '../../hot-toast.model';
import { animate } from '../../utils';

@Component({
  selector: 'hot-toast-group-item',
  templateUrl: 'hot-toast-group-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimatedIconComponent, IndicatorComponent, DynamicViewDirective],
})
export class HotToastGroupItemComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  private _toast: Toast<unknown>;
  @Input()
  set toast(value: Toast<unknown>) {
    this._toast = value;
    const ogStyle = this.toastBarBaseStylesSignal();
    const newStyle: Record<string, string> = { ...value.style };

    if (ogStyle['animation']?.includes('hotToastExitAnimation')) {
      // if toast is set for exit, we don't need want set the enter animation
      newStyle['animation'] = ogStyle['animation'];
    } else {
      const top = value.position.includes('top');
      const enterAnimation = `hotToastEnterAnimation${
        top ? 'Negative' : 'Positive'
      } ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
      newStyle['animation'] = enterAnimation;
    }

    this.toastBarBaseStylesSignal.set(newStyle);
  }
  get toast() {
    return this._toast;
  }
  @Input() offset = 0;
  @Input() defaultConfig: ToastConfig;
  @Input() toastRef: CreateHotToastRef<unknown>;

  private _toastsAfter = 0;
  get toastsAfter() {
    return this._toastsAfter;
  }
  @Input()
  set toastsAfter(value) {
    this._toastsAfter = value;
  }

  @Input() isShowingAllToasts = false;

  @Output() height = new EventEmitter<number>();
  @Output() beforeClosed = new EventEmitter();
  @Output() afterClosed = new EventEmitter<HotToastClose>();
  @Output() showAllToasts = new EventEmitter<boolean>();
  @Output() toggleGroup = new EventEmitter<HotToastGroupEvent>();

  @ViewChild('hotToastBarBase', { static: true }) protected toastBarBase: ElementRef<HTMLElement>;

  isManualClose = false;
  context: Record<string, unknown>;
  toastComponentInjector: Injector;
  toastBarBaseStylesSignal = signal({});

  private unlisteners: VoidFunction[] = [];
  protected softClosed = false;

  private injector = inject(Injector);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  get toastBarBaseHeight() {
    return this.toastBarBase.nativeElement.offsetHeight;
  }

  get scale() {
    return this.defaultConfig.stacking !== 'vertical' && !this.isShowingAllToasts
      ? this.toastsAfter * -HOT_TOAST_DEPTH_SCALE + 1
      : 1;
  }

  get translateY() {
    return this.offset * (this.top ? 1 : -1) + 'px';
  }

  get exitAnimationDelay() {
    return this.toast.duration + 'ms';
  }

  get top() {
    return this.toast.position.includes('top');
  }

  get containerPositionStyle() {
    const verticalStyle = this.top ? { top: 0 } : { bottom: 0 };
    const transform = `translateY(var(--hot-toast-translate-y)) scale(var(--hot-toast-scale))`;

    const horizontalStyle = this.toast.position.includes('left')
      ? {
          left: 0,
        }
      : this.toast.position.includes('right')
      ? {
          right: 0,
        }
      : {
          left: 0,
          right: 0,
          justifyContent: 'center',
        };
    return {
      transform,
      ...verticalStyle,
      ...horizontalStyle,
    };
  }

  get isIconString() {
    return typeof this.toast.icon === 'string';
  }

  get groupChildrenToastRefs() {
    return this.toastRef.groupRefs.filter((ref) => !!ref);
  }
  set groupChildrenToastRefs(value: CreateHotToastRef<unknown>[]) {
    (this.toastRef as { groupRefs: CreateHotToastRef<unknown>[] }).groupRefs = value;
  }

  get groupChildrenToasts() {
    return this.groupChildrenToastRefs.map((ref) => ref.getToast());
  }

  get groupHeight() {
    return this.visibleToasts.map((t) => t.height).reduce((prev, curr) => prev + curr, 0);
  }

  get isExpanded() {
    return this.toastRef.groupExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toast && !changes.toast.firstChange && changes.toast.currentValue?.message) {
      requestAnimationFrame(() => {
        this.height.emit(this.toastBarBase.nativeElement.offsetHeight);
      });
    }
  }

  ngOnInit() {
    if (isTemplateRef(this.toast.message)) {
      this.context = { $implicit: this.toastRef };
    }
    if (isComponent(this.toast.message)) {
      this.toastComponentInjector = Injector.create({
        providers: [
          {
            provide: HotToastRef,
            useValue: this.toastRef,
          },
        ],
        parent: this.toast.injector || this.injector,
      });
    }

    const nativeElement = this.toastBarBase.nativeElement;
    // Caretaker note: `animationstart` and `animationend` events are event tasks that trigger change detection.
    // We'd want to trigger the change detection only if it's an exit animation.
    this.ngZone.runOutsideAngular(() => {
      this.unlisteners.push(
        // Caretaker note: we have to remove these event listeners at the end (even if the element is removed from DOM).
        // zone.js stores its `ZoneTask`s within the `nativeElement[Zone.__symbol__('animationstart') + 'false']` property
        // with callback that capture `this`.
        this.renderer.listen(nativeElement, 'animationstart', (event: AnimationEvent) => {
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => {
              this.renderer.setStyle(nativeElement, 'pointer-events', 'none');
              this.renderer.setStyle(nativeElement.parentElement, 'pointer-events', 'none');
              this.beforeClosed.emit();
            });
          }
        }),
        this.renderer.listen(nativeElement, 'animationend', (event: AnimationEvent) => {
          if (this.isEnterAnimation(event)) {
            this.ngZone.run(() => {
              if (this.toast.autoClose) {
                const exitAnimation = `hotToastExitAnimation${
                  this.top ? 'Negative' : 'Positive'
                } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) var(--hot-toast-exit-animation-delay) var(--hot-toast-exit-animation-state)`;
                this.toastBarBaseStylesSignal.set({ ...this.toast.style, animation: exitAnimation });
              }
            });
          }
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => this.afterClosed.emit({ dismissedByAction: this.isManualClose, id: this.toast.id }));
          }
        })
      );
    });
  }

  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    // Caretaker note: accessing `offsetHeight` triggers the whole layout update.
    // Macro tasks (like `setTimeout`) might be executed within the current rendering frame and cause a frame drop.
    requestAnimationFrame(() => {
      this.height.emit(nativeElement.offsetHeight);
    });

    this.setToastAttributes();
  }

  softClose() {
    const exitAnimation = `hotToastExitSoftAnimation${
      this.top ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(this.renderer, nativeElement, exitAnimation);
    this.softClosed = true;
  }
  softOpen() {
    const softEnterAnimation = `hotToastEnterSoftAnimation${
      top ? 'Negative' : 'Positive'
    } ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(this.renderer, nativeElement, softEnterAnimation);
    this.softClosed = false;
  }

  close() {
    this.isManualClose = true;
    this.cdr.markForCheck();

    const exitAnimation = `hotToastExitAnimation${
      this.top ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
    this.toastBarBaseStylesSignal.set({ ...this.toast.style, animation: exitAnimation });
  }

  handleMouseEnter() {
    this.showAllToasts.emit(true);
  }
  handleMouseLeave() {
    this.showAllToasts.emit(false);
  }

  ngOnDestroy() {
    this.close();
    while (this.unlisteners.length) {
      this.unlisteners.pop()();
    }
  }

  private isExitAnimation(ev: AnimationEvent) {
    return ev.animationName.includes('hotToastExitAnimation');
  }

  private isEnterAnimation(ev: AnimationEvent) {
    return ev.animationName.includes('hotToastEnterAnimation');
  }

  private setToastAttributes() {
    const toastAttributes: Record<string, string> = this.toast.attributes;
    for (const [key, value] of Object.entries(toastAttributes)) {
      this.renderer.setAttribute(this.toastBarBase.nativeElement, key, value);
    }
  }

  get visibleToasts() {
    return this.groupChildrenToasts.filter((t) => t.visible);
  }
}
