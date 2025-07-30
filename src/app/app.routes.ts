import { Routes } from '@angular/router';
import { PlaygroundComponent } from './features/playground/playground.component';
import { HomeComponent } from './features/home/home.component';
import { TestContainerComponent } from './test-container/test-container.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'test-container', component: TestContainerComponent },
];
