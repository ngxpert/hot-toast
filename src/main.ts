import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideHotToastConfig, HOT_TOAST_CONTAINER_TOKEN } from '@ngxpert/hot-toast';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

// Conditionally provide the container token for testing
const providers = [
  importProvidersFrom(BrowserModule, FormsModule),
  provideAnimations(),
  provideHotToastConfig(),
  provideRouter(routes, withInMemoryScrolling()),
  provideHttpClient(withFetch()),
];

// Add container token when testing or when URL contains test-container
if (!environment.production || window.location.href.includes('test-container')) {
  providers.push({
    provide: HOT_TOAST_CONTAINER_TOKEN,
    useValue: '#custom-toast-container',
  } as any);
}

bootstrapApplication(AppComponent, {
  providers,
}).catch((err) => console.error(err));
