import { DialogRef } from '@angular/cdk/dialog';
import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from '@ngneat/overview';
import {
  CommandComponent,
  InputDirective,
  ListComponent,
  GroupComponent,
  ItemDirective,
  EmptyDirective,
  SeparatorComponent,
} from '@ngxpert/cmdk';

@Component({
  selector: 'app-jump-to-dialog',
  templateUrl: 'jump-to-dialog.component.html',
  standalone: true,
  imports: [
    CommandComponent,
    InputDirective,
    ListComponent,
    GroupComponent,
    ItemDirective,
    EmptyDirective,
    SeparatorComponent,
    NgFor
  ],
})
export class JumpToDialogComponent {
  readonly jumpSections: { href: string; emoji: string; label: string }[] = [
    {
      href: '#info',
      emoji: 'ℹ️',
      label: 'Info',
    },
    {
      href: '#success',
      emoji: '✅',
      label: 'Success',
    },
    {
      href: '#warning',
      emoji: '⚠️',
      label: 'Warning',
    },
    {
      href: '#error',
      emoji: '❌',
      label: 'Error',
    },
    {
      href: '#loader',
      emoji: '🔄️',
      label: 'Loader',
    },
    {
      href: '#observe',
      emoji: '⏳',
      label: 'Observe',
    },
    {
      href: '#multi',
      emoji: '↕️',
      label: 'Multi Line',
    },
    {
      href: '#emoji',
      emoji: '👏',
      label: 'Emoji',
    },
    {
      href: '#snackbar',
      emoji: '🌞',
      label: 'Snackbar',
    },
    {
      href: '#dismissible',
      emoji: '❎',
      label: 'dismissible',
    },
    {
      href: '#events',
      emoji: '🔂',
      label: 'Events',
    },
    {
      href: '#themed',
      emoji: '🎨',
      label: 'Themed',
    },
    {
      href: '#toast-ref',
      emoji: '🕵️',
      label: 'Close manually',
    },
    {
      href: '#toast-ref-msg',
      emoji: '🕵️',
      label: 'Update message',
    },
    {
      href: '#only-one-at-a-time',
      emoji: '☝️',
      label: 'One at a Time',
    },
    {
      href: '#persistent',
      emoji: '🔢',
      label: 'Persistent',
    },
    {
      href: '#html',
      emoji: '🔠',
      label: 'HTML',
    },
    {
      href: '#template',
      emoji: '🔩',
      label: 'Template',
    },
    {
      href: '#template-data',
      emoji: '🎫',
      label: 'Template Data',
    },
    {
      href: '#component',
      emoji: '🆕',
      label: 'Component',
    },
    {
      href: '#injector',
      emoji: '💉',
      label: 'Injector',
    },
    {
      href: '#component-data',
      emoji: '💾',
      label: 'Component Data',
    },
    {
      href: '#positions',
      emoji: '🅿️',
      label: 'Positions',
    },
    {
      href: '#stacking',
      emoji: '🪜',
      label: 'Stacking',
    },
    {
      href: '#grouping-pre',
      emoji: '🔔',
      label: 'Pre Grouped',
    },
    {
      href: '#grouping-post',
      emoji: '🔔',
      label: 'Post Grouped',
    },
    {
      href: '#order',
      emoji: '🔀',
      label: 'Order',
    },
  ];

  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;
  private router = inject(Router);
  public dialogRef: DialogRef;
  inputValue = '';
  readonly groups: {
    group: string;
    items: {
      label: string;
      itemSelected?: () => void;
      icon: Content;
      separatorOnTop?: boolean;
    }[];
  }[] = [
    {
      group: 'Variants',
      items: [
        {
          label: 'Info',
          itemSelected: () => {
            this.router.navigateByUrl('#info');
            this.dialogRef.close();
          },
          icon: 'ℹ️',
        },
      ],
    },
  ];
  readonly projectItems = new Array(6);
  styleTransform = '';
  setInputValue(ev: Event) {
    this.inputValue = (ev.target as HTMLInputElement).value;
  }
  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.bounce();
    }
  }
  bounce() {
    this.styleTransform = 'scale(0.96)';
    setTimeout(() => {
      this.styleTransform = '';
    }, 100);
  }
}
