import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-playground-sonner-success-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clip-rule="evenodd"
      />
    </svg>
  `,
})
export class SuccessIconComponent {}

@Component({
  selector: 'app-playground-sonner-error-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
        clip-rule="evenodd"
      />
    </svg>
  `,
})
export class ErrorIconComponent {}

@Component({
  selector: 'app-playground-sonner-info-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clip-rule="evenodd"
      />
    </svg>
  `,
})
export class InfoIconComponent {}

@Component({
  selector: 'app-playground-sonner-warning-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
      <path
        fill-rule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>
  `,
})
export class WarningIconComponent {}

@Component({
  selector: 'app-playground-sonner-close-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,
})
export class CloseIconComponent {}

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-toast-with-sonner-style',
  templateUrl: './toast-with-sonner-style.component.html',
  styles: `
    button {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    button:active {
      transform: translateY(1px);
    }
  `,
})
export class ToastWithSonnerStyleComponent {
  private toast = inject(HotToastService);

  showToast(type: ToastType = 'default'): void {
    const messages = {
      default: 'An opinionated toast message',
      success: 'Event has been created',
      error: 'Something went wrong',
      info: 'This is an informational message',
      warning: 'Warning: This action may be irreversible',
    };

    const baseOptions = {
      duration: 4000,
      dismissible: true,
      style: {
        padding: '16px',
        background: 'white',
        color: 'hsl(0, 0%, 9%)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid hsl(0, 0%, 93%)',
        borderRadius: '8px',
        fontSize: '13px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
      },
      className: 'sonner-toast',
      iconTheme: {
        primary: 'hsl(0, 0%, 9%)',
        secondary: 'white',
      },
      autoClose: true,
    };

    // Add global styles for toast layout
    this.addSonnerGlobalStyles();

    switch (type) {
      case 'success':
        this.toast.success(messages[type], {
          ...baseOptions,
          style: {
            ...baseOptions.style,
            background: 'hsl(143, 85%, 96%)',
            borderColor: 'hsl(145, 92%, 87%)',
            color: 'hsl(140, 100%, 27%)',
          },
          iconTheme: {
            primary: 'hsl(140, 100%, 27%)',
            secondary: 'hsl(143, 85%, 96%)',
          },
          icon: SuccessIconComponent,
        });
        break;
      case 'error':
        this.toast.error(messages[type], {
          ...baseOptions,
          style: {
            ...baseOptions.style,
            background: 'hsl(359, 100%, 97%)',
            borderColor: 'hsl(359, 100%, 94%)',
            color: 'hsl(360, 100%, 45%)',
          },
          iconTheme: {
            primary: 'hsl(360, 100%, 45%)',
            secondary: 'hsl(359, 100%, 97%)',
          },
          icon: ErrorIconComponent,
        });
        break;
      case 'info':
        this.toast.info(messages[type], {
          ...baseOptions,
          style: {
            ...baseOptions.style,
            background: 'hsl(208, 100%, 97%)',
            borderColor: 'hsl(221, 91%, 93%)',
            color: 'hsl(210, 92%, 45%)',
          },
          iconTheme: {
            primary: 'hsl(210, 92%, 45%)',
            secondary: 'hsl(208, 100%, 97%)',
          },
          icon: InfoIconComponent,
        });
        break;
      case 'warning':
        this.toast.warning(messages[type], {
          ...baseOptions,
          style: {
            ...baseOptions.style,
            background: 'hsl(49, 100%, 97%)',
            borderColor: 'hsl(49, 91%, 84%)',
            color: 'hsl(31, 92%, 45%)',
          },
          iconTheme: {
            primary: 'hsl(31, 92%, 45%)',
            secondary: 'hsl(49, 100%, 97%)',
          },
          icon: WarningIconComponent,
        });
        break;
      default:
        this.toast.show(messages[type], baseOptions);
        break;
    }
  }

  private addSonnerGlobalStyles(): void {
    if (!document.getElementById('sonner-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'sonner-styles';
      styleSheet.textContent = `
        .sonner-toast {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          max-width: 350px !important;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }
}
