import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  computed,
  input,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, AnimatedIconComponent, IndicatorComponent, DynamicViewDirective],
})
export class HotToastGroupItemComponent {
  toast = input.required<Toast<unknown>>();
  offset = input.required<number>();
  defaultConfig = input.required<ToastConfig>();
  isShowingAllToasts = input.required<boolean>();
  toastRef = input.required<CreateHotToastRef<unknown>>();
  toastsAfter = input.required<number>();


  @Output() height = new EventEmitter<number>();
  @Output() beforeClosed = new EventEmitter();
  @Output() afterClosed = new EventEmitter<HotToastClose>();
  @Output() showAllToasts = new EventEmitter<boolean>();
  @Output() toggleGroup = new EventEmitter<HotToastGroupEvent>();

  @ViewChild('hotToastBarBase') protected toastBarBase: ElementRef<HTMLElement>;

  isManualClose = false;
  context: Record<string, any>;
  toastComponentInjector: Injector;

  private unlisteners: VoidFunction[] = [];
  protected softClosed = false;

  constructor(
    protected injector: Injector,
    protected renderer: Renderer2,
    protected ngZone: NgZone,
    protected cdr: ChangeDetectorRef
  ) {}

  get toastBarBaseHeight() {
    return this.toastBarBase.nativeElement.offsetHeight;
  }

  scale = computed(()=> this.defaultConfig().stacking !== 'vertical' && !this.isShowingAllToasts() ?
   this.toastsAfter() * -HOT_TOAST_DEPTH_SCALE + 1 : 1);


  translateY = computed(()=> this.offset() * (this.top() ? 1 : -1) + 'px');

  exitAnimationDelay = computed(() => this.toast().duration + 'ms');

  top = computed(() => this.toast().position.includes('top'));

  containerPositionStyle = computed(() => {
    const verticalStyle = this.top() ? { top: 0 } : { bottom: 0 };
    const transform = `translateY(var(--hot-toast-translate-y)) scale(var(--hot-toast-scale))`;

    const horizontalStyle = this.toast().position.includes('left')
      ? {
          left: 0,
        }
      : this.toast().position.includes('right')
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
  })

  toastBarBaseStyles = computed(() => {
    const enterAnimation = `hotToastEnterAnimation${
      this.top() ? 'Negative' : 'Positive'
    } ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;

    const exitAnimation = `hotToastExitAnimation${
      this.top() ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) var(--hot-toast-exit-animation-delay) var(--hot-toast-exit-animation-state)`;

    const animation = this.toast().autoClose ? `${enterAnimation}, ${exitAnimation}` : enterAnimation;

    return { ...this.toast().style, animation };
  })

  isIconString = computed(() => typeof this.toast().icon === 'string');

  get groupChildrenToastRefs() {
    return this.toastRef().groupRefs;
  }
  set groupChildrenToastRefs(value: CreateHotToastRef<unknown>[]) {
    (this.toastRef() as { groupRefs: CreateHotToastRef<unknown>[] }).groupRefs = value;
  }

  get groupChildrenToasts() {
    return this.groupChildrenToastRefs.map((ref) => ref.getToast());
  }

  get groupHeight() {
    return this.visibleToasts.map((t) => t.height).reduce((prev, curr) => prev + curr, 0);
  }


  isExpanded = computed(() => this.toastRef().groupExpanded);
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toast && !changes.toast.firstChange && changes.toast.currentValue?.message) {
      requestAnimationFrame(() => {
        this.height.emit(this.toastBarBase.nativeElement.offsetHeight);
      });
    }
  }

  isTempRef = computed(() => isTemplateRef(this.toast().message));
  isCompRef = computed(() => isComponent(this.toast().message));

  ngOnInit() {
    if (this.isTempRef()) {
      this.context = { $implicit: this.toastRef() };
    }
    if (this.isCompRef()) {
      this.toastComponentInjector = Injector.create({
        providers: [
          {
            provide: HotToastRef,
            useValue: this.toastRef(),
          },
        ],
        parent: this.toast().injector || this.injector,
      });
    }
  }

  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    // Caretaker note: accessing `offsetHeight` triggers the whole layout update.
    // Macro tasks (like `setTimeout`) might be executed within the current rendering frame and cause a frame drop.
    requestAnimationFrame(() => {
      this.height.emit(nativeElement.offsetHeight);
    });

    // Caretaker note: `animationstart` and `animationend` events are event tasks that trigger change detection.
    // We'd want to trigger the change detection only if it's an exit animation.
    this.ngZone.runOutsideAngular(() => {
      this.unlisteners.push(
        // Caretaker note: we have to remove these event listeners at the end (even if the element is removed from DOM).
        // zone.js stores its `ZoneTask`s within the `nativeElement[Zone.__symbol__('animationstart') + 'false']` property
        // with callback that capture `this`.
        this.renderer.listen(nativeElement, 'animationstart', (event: AnimationEvent) => {
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => this.beforeClosed.emit());
          }
        }),
        this.renderer.listen(nativeElement, 'animationend', (event: AnimationEvent) => {
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() =>
              this.afterClosed.emit({ dismissedByAction: this.isManualClose, id: this.toast().id })
            );
          }
        })
      );
    });

    this.setToastAttributes();
  }

  softClose() {
    const exitAnimation = `hotToastExitSoftAnimation${
      this.top() ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(nativeElement, exitAnimation);
    this.softClosed = true;
  }
  softOpen() {
    const softEnterAnimation = `hotToastEnterSoftAnimation${
      top ? 'Negative' : 'Positive'
    } ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(nativeElement, softEnterAnimation);
    this.softClosed = false;
  }

  close() {
    this.isManualClose = true;

    const exitAnimation = `hotToastExitAnimation${
      this.top() ? 'Negative' : 'Positive'
    } ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;

    const nativeElement = this.toastBarBase.nativeElement;

    animate(nativeElement, exitAnimation);
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

  private setToastAttributes() {
    const toastAttributes: Record<string, string> = this.toast().attributes;
    for (const [key, value] of Object.entries(toastAttributes)) {
      this.renderer.setAttribute(this.toastBarBase.nativeElement, key, value);
    }
  }

  get visibleToasts() {
    return this.groupChildrenToasts.filter((t) => t.visible);
  }
}
