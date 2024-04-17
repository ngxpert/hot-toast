const childNotifications = `
readonly commonOptions: ToastOptions&lt;unknown> = { autoClose: false };

readonly childNotifications = (ngTemplateGroupItem: Content): HotToastGroupChild[] => [
  {
    options: {
      message: ngTemplateGroupItem,
      data: {
        title: 'New Message!',
        subTitle: 'Sarah sent you a message.',
        time: 'Just Now',
        icon: '🗨️',
      },
      ...this.commonOptions,
    },
  },
  {
    options: {
      message: ngTemplateGroupItem,
      data: {
        title: 'Level Up!',
        subTitle: "You've unlocked a new achievement.",
        time: '2 min ago',
        icon: '✅',
      },
      ...this.commonOptions,
    },
  },
  {
    options: {
      message: ngTemplateGroupItem,
      data: {
        title: 'Reminder: Meeting Today',
        subTitle: 'Your team meeting starts in 30 minutes.',
        time: '1 hours ago',
        icon: '⏰',
      },
      ...this.commonOptions,
    },
  },
  {
    options: {
      message: ngTemplateGroupItem,
      data: {
        title: 'Special Offer!',
        subTitle: 'Save 20% off on subscription upgrade.',
        time: '12 hours ago',
        icon: '🏷️',
      },
      ...this.commonOptions,
    },
  },
  {
    options: {
      message: ngTemplateGroupItem,
      data: {
        title: 'Task Assigned',
        subTitle: 'A new task is awaiting your action.',
        time: 'Yesterday',
        icon: '✔️',
      },
      ...this.commonOptions,
    },
  },
];`;

export const preGroupingTS = `
@ViewChild('groupTemplate') ngTemplateGroup;
@ViewChild('groupItemTemplate') ngTemplateGroupItem;

toast = inject(HotToastService);

showPreGroupedNotifications() {
  this.toast.show(ngTemplateGroup, {
    position: 'top-right',
    autoClose: false,
    className: 'hot-toast-custom-class',
    group: {
      className: 'hot-toast-custom-class',
      children: this.childNotifications(this.ngTemplateGroupItem),
    }
  })
}

visibleToasts(toastRefs: CreateHotToastRef&lt;unknown>[]) {
  return toastRefs.filter((t) => t.getToast().visible).length;
}

${childNotifications}
`;

export const preGroupingHTML = `
&lt;ng-template #groupTemplate let-toastRef>
  &lt;div class="flex gap-x-2 w-full h-[56px] items-center">
    &lt;div
      class="bg-slate-100 rounded transition-all ease-in-out duration-[230ms] flex items-center justify-center text-xl"
      [ngClass]="{ 'w-10 h-10': toastRef.groupExpanded, 'w-14 h-14': !toastRef.groupExpanded }"
    >
      &lt;span
        class="transition-all ease-in-out duration-[230ms] drop-shadow-md"
        [ngClass]="{ 'scale-1': toastRef.groupExpanded, 'scale-125': !toastRef.groupExpanded }"
      >
        @if (visibleToasts(toastRef.groupRefs) === 0) { 🔕 } @else {
        &lt;span class="bell-animation"> 🔔 &lt;/span>
        }
      &lt;/span>
    &lt;/div>
    &lt;div>
      &lt;div
        class="font-medium transition-all ease-in-out duration-[230ms]"
        [ngClass]="{
          'scale-125': !toastRef.groupExpanded,
          'scale-1 pl-0': toastRef.groupExpanded,
          'pl-[22px]': !toastRef.groupExpanded && visibleToasts(toastRef.groupRefs) !== 0,
          'pl-[14px]': !toastRef.groupExpanded && visibleToasts(toastRef.groupRefs) === 0
        }"
      >
        @if (visibleToasts(toastRef.groupRefs) === 0) { No } @else {
        {{ visibleToasts(toastRef.groupRefs) }}
        } New Activities
      &lt;/div>
      &lt;div
        class="text-gray-500 transition-all ease-in-out duration-[230ms]"
        [ngClass]="{ 'scale-90 ml-[-10px]': toastRef.groupExpanded, 'ml-0': !toastRef.groupExpanded }"
      >
        @if (visibleToasts(toastRef.groupRefs) === 0) { You're all caught up! } @else { What's happening around you! }
      &lt;/div>
    &lt;/div>
    @if (visibleToasts(toastRef.groupRefs) > 0) {
    &lt;button
      (click)="toastRef.toggleGroup()"
      class="ml-auto self-center hot-toast-group-btn"
      [class.expanded]="toastRef.groupExpanded"
      [attr.aria-label]="toastRef.groupExpanded ? 'Collapse' : 'Expand'"
    >&lt;/button>
    }
  &lt;/div>
&lt;/ng-template>
&lt;ng-template #groupItemTemplate let-toastRef>
  &lt;div class="flex gap-x-2 w-full">
    &lt;div class="bg-slate-100 rounded w-10 h-10 flex items-center justify-center text-xl">
      &lt;span class="drop-shadow-md">
        {{ toastRef.data.icon }}
      &lt;/span>
    &lt;/div>
    &lt;div>
      {{ toastRef.data.title }}
      &lt;div class="text-sm text-gray-500">{{ toastRef.data.subTitle }}&lt;/div>
    &lt;/div>
    &lt;div class="text-xs text-gray-500 ml-auto">
      {{ toastRef.data.time }}
    &lt;/div>
  &lt;/div>
&lt;/ng-template>`;

export const preGroupingCSS = `
.hot-toast-custom-class {
  --hot-toast-width: 390px;
  --hot-toast-max-width: var(--hot-toast-width);
  --hot-toast-message-justify-content: start;
  --hot-toast-message-margin: 4px 0;
  --hot-toast-group-btn-align-self: center;
}


@keyframes bell-keyframes {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.bell-animation {
  animation-duration: 1s;
  animation-iteration-count: var(--ring-bell);
  animation-name: bell-keyframes;
  display: inline-block;
  transform-origin: top center;
}`;

export const postGroupingTS = `
@ViewChild('groupTemplate') ngTemplateGroup;
@ViewChild('groupItemTemplate') ngTemplateGroupItem;

toast = inject(HotToastService);
parentRef: CreateHotToastRef&lt;unknown>;

showFirstToast() {
  this.parentRef = this.toast.show(ngTemplateGroup, {
    position: 'top-right',
    autoClose: false,
    className: 'hot-toast-custom-class',
    group: {
      className: 'hot-toast-custom-class'
    }
  })
}

visibleToasts(toastRefs: CreateHotToastRef&lt;unknown>[]) {
  return toastRefs.filter((t) => t.getToast().visible).length;
}

addNotification() {
  const allNotifications = this.childNotifications(this.ngTemplateGroupItem);
  const toast = allNotifications[this.notificationCounter++ % allNotifications.length].options;
  this.toast.show(toast.message, { ...toast, group: { parent: this.parentRef } });
}

${childNotifications}
`;
