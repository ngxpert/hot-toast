import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { CodeComponent } from '../../shared/components/code/code.component';

type PopoverDemo = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  snippet: string;
};

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  imports: [CodeComponent],
})
export class PopoverComponent {
  private toast = inject(HotToastService);

  popoverDemos: PopoverDemo[] = [
    {
      id: 'popover-enabled',
      title: 'With Popover (Default)',
      description: 'Toast rendered using Popover API in the top layer',
      emoji: '🔝',
      snippet: `
// Popover is enabled by default when browser supports it
toast.success('Using Popover API!', {
  icon: '🔝',
  position: 'top-center'
});

// The toast will be rendered in the browser's top layer
// avoiding z-index issues with dialogs, modals, etc.`,
    },
    {
      id: 'popover-disabled',
      title: 'Without Popover',
      description: 'Toast rendered using traditional overlay',
      emoji: '📦',
      snippet: `
// Disable popover for specific toast
toast.info('Traditional overlay', {
  icon: '📦',
  usePopover: false,
  position: 'top-center'
});

// This toast won't use the Popover API
// and will use the traditional overlay approach`,
    },
  ];
  selectedDemo: PopoverDemo = this.popoverDemos[0];

  globalConfigSnippet = `
import { 
  provideHotToastConfig, 
  HOT_TOAST_USE_POPOVER_TOKEN 
} from '@ngxpert/hot-toast';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideHotToastConfig({
      // Popover is enabled by default
      // You can disable it globally:
      usePopover: false
    }),
    // Or use the injection token:
    {
      provide: HOT_TOAST_USE_POPOVER_TOKEN,
      useValue: false, // disable popover globally
    },
  ],
});
`;

  runDemo(demo: PopoverDemo): void {
    this.selectedDemo = demo;
  }
}
