import { Component } from '@angular/core';
import { CodeComponent } from '../../shared/components/code/code.component';

@Component({
  selector: 'app-router-integration',
  imports: [CodeComponent],
  templateUrl: './router-integration.component.html',
})
export class RouterIntegrationComponent {
  basicSnippet = `import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { NavigationStart, NavigationEnd } from '@angular/router';

@Component({ /* ... */ })
export class AppComponent {
  private toast = inject(HotToastService);

  constructor() {
    // Auto-unsubscribes when AppComponent is destroyed
    this.toast.onRouteChange({
      [NavigationStart.name]: 'Loading...',
      [NavigationEnd.name]: 'Done!',
    });
  }
}`.trim();

  fullSnippet = `import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  GuardsCheckStart,
  ResolveStart,
} from '@angular/router';

@Component({ /* ... */ })
export class AppComponent {
  private toast = inject(HotToastService);

  constructor() {
    this.toast.onRouteChange({
      // Plain string → blank toast
      [NavigationStart.name]: 'Navigating...',

      // Full options → custom type, duration, style
      [NavigationEnd.name]: {
        message: 'Navigation complete',
        type: 'success',
        duration: 2000,
      },

      [NavigationCancel.name]: {
        message: 'Navigation cancelled',
        type: 'warning',
      },

      [NavigationError.name]: {
        message: 'Navigation failed',
        type: 'error',
      },

      // Fine-grained lifecycle events
      [GuardsCheckStart.name]: 'Checking guards...',
      [ResolveStart.name]: 'Resolving data...',
    });
  }
}`.trim();

  manualSnippet = `import { Component, inject, DestroyRef } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { NavigationStart, NavigationEnd } from '@angular/router';

@Component({ /* ... */ })
export class SomeComponent {
  private toast = inject(HotToastService);

  // Option 1 — pass DestroyRef explicitly (works from any method)
  ngOnInit() {
    const destroyRef = inject(DestroyRef); // only valid in injection context
    this.toast.onRouteChange(
      { [NavigationStart.name]: 'Loading...', [NavigationEnd.name]: 'Done!' },
      destroyRef,
    );
  }

  // Option 2 — manage the Subscription manually
  private sub = this.toast.onRouteChange({
    [NavigationStart.name]: 'Loading...',
    [NavigationEnd.name]: 'Done!',
  });

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}`.trim();
}
