import { InjectionToken } from '@angular/core';

/**
 * Injection token to provide a custom container selector for the toast container. The value will be used as a selector to find the container element using `document.querySelector`.
 * @example
 * ```ts
 * import { HOT_TOAST_CONTAINER_TOKEN, provideHotToastConfig } from '@ngxpert/hot-toast';
 * import { bootstrapApplication } from '@angular/platform-browser';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideHotToastConfig(),
 *     {
 *       provide: HOT_TOAST_CONTAINER_TOKEN,
 *       useValue: '#toast-container',
 *     },
 *   ],
 * }).catch((err) => console.error(err));
 * ```
 *
 */
export const HOT_TOAST_CONTAINER_TOKEN = new InjectionToken<string>('HOT_TOAST_CONTAINER_TOKEN');
