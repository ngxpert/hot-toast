import { Routes } from '@angular/router';
import { PlaygroundComponent } from './features/playground/playground.component';
import { HomeComponent } from './features/home/home.component';
import { HttpInterceptorE2eComponent } from './http-interceptor-e2e/http-interceptor-e2e.component';
import { HttpInterceptorSampleComponent } from './http-interceptor-sample/http-interceptor-sample.component';
import { TestContainerComponent } from './test-container/test-container.component';
import { ToastLifecycleE2eComponent } from './toast-lifecycle-e2e/toast-lifecycle-e2e.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'test-container', component: TestContainerComponent },
  { path: 'toast-lifecycle-e2e', component: ToastLifecycleE2eComponent },
  { path: 'http-interceptor-e2e', component: HttpInterceptorE2eComponent },
  { path: 'http-interceptor-sample', component: HttpInterceptorSampleComponent },
];
