import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Example } from '../example/example.component';
import { CreateHotToastRef, HotToastGroupChild, HotToastService, ToastOptions } from '@ngxpert/hot-toast';
import { Content } from '@ngneat/overview';
import { EmojiButtonComponent } from 'src/app/shared/components/emoji-button/emoji-button.component';
import { CodeComponent } from 'src/app/shared/components/code/code.component';
import { HtmlPipe } from 'src/app/shared/pipes/html.pipe';
import { NgClass } from '@angular/common';
import { preGroupingTS, preGroupingHTML, preGroupingCSS, postGroupingTS } from './snippets';
import { HotToastBuilder } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-grouping',
  templateUrl: 'grouping.component.html',
  standalone: true,
  imports: [EmojiButtonComponent, CodeComponent, HtmlPipe, NgClass],
  styleUrls: ['./grouping.component.scss'],
})
export class GroupingComponent implements OnInit {
  toast = inject(HotToastService);
  examples: Example[] = [];
  @ViewChild('groupTemplate') ngTemplateGroup;
  @ViewChild('groupItemTemplate') ngTemplateGroupItem;

  parentRef: CreateHotToastRef<unknown>;

  private notificationCounter = 0;

  readonly snippetLanguages: { label: string; value: 'typescript' | 'html' | 'css' }[] = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
  ];
  readonly commonOptions: ToastOptions<unknown> = { autoClose: false };
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
  ];

  ngOnInit(): void {
    const examples: Example[] = [
      {
        id: 'grouping-pre',
        title: 'Show Pre-Grouped Notifications',
        subtitle: `<p class="mb-2">You can create grouped toasts using the builder pattern. First create the parent and child toasts, then connect them using <b><code>addChild()</code></b>.</p>
        <p class="text-md bg-toast-200 p-4 rounded-2xl p-4">
        👉 Create toasts with <b><code>create()</code></b> and show them after all refs are attached using <b><code>afterGroupRefsAttached</code></b>
      </p>
          `,
        emoji: '🔔',
        activeSnippet: 'typescript',
        snippet: {
          typescript: preGroupingTS,
          html: preGroupingHTML,
          css: preGroupingCSS,
        },
        action: () => {
          this.showPreGroupedNotifications();
        },
      },
      {
        id: 'grouping-post',
        title: 'Open the first toast',
        subtitle:
          'If you need to add children in existing toast, you can use <b><code>group.parent</code></b> option. This is useful if you want to show for example dynamic notifications in an already opened toast.',
        emoji: '🔔',
        activeSnippet: 'typescript',
        snippet: {
          typescript: postGroupingTS,
          html: preGroupingHTML,
          css: preGroupingCSS,
        },
        action: () => {
          this.parentRef = this.toast.show(this.ngTemplateGroup, {
            position: 'top-right',
            autoClose: false,
            className: 'hot-toast-custom-class',
            group: {
              className: 'hot-toast-custom-class',
            },
          });
        },
      },
    ];

    Array.prototype.push.apply(this.examples, examples);
  }

  visibleToasts(toastRefs: CreateHotToastRef<unknown>[]) {
    return toastRefs.filter((t) => t.getToast().visible).length;
  }

  addNotification() {
    const allNotifications = this.childNotifications(this.ngTemplateGroupItem);
    const toast = allNotifications[this.notificationCounter++ % allNotifications.length].options;
    this.toast.show(toast.message, { ...toast, group: { parent: this.parentRef } });
  }

  click(e: Example) {
    e.action();
  }

  showPreGroupedNotifications() {
    // Create parent toast first but don't show it
    const parentBuilder = new HotToastBuilder(this.ngTemplateGroup, this.toast).setOptions({
      position: 'top-right',
      autoClose: false,
      className: 'hot-toast-custom-class',
      group: {
        className: 'hot-toast-custom-class',
      },
    });

    // Create child toasts
    const children = this.childNotifications(this.ngTemplateGroupItem).map((child) => {
      return new HotToastBuilder(child.options.message, this.toast).setOptions(child.options);
    });

    // Add children to parent
    children.forEach((child) => parentBuilder.addChild(child));

    // Create the toast with all children (but don't show yet)
    const parentRef = parentBuilder.create();

    // Once all refs are attached, show the parent toast
    parentRef.afterGroupRefsAttached.subscribe(() => {
      parentRef.show();
    });
  }
}
