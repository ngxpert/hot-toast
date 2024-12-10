import { Component } from '@angular/core';
import { CodeComponent } from '../../shared/components/code/code.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  imports: [CodeComponent],
})
export class StepsComponent {
  showManual = false;
  ngCliSetup = `
ng add @ngxpert/hot-toast`;
  stepList: { title: string; subTitle: string; code: string; language: string }[] = [
    {
      title: 'Install package',
      subTitle: 'Using npm or yarn',
      code: `
  # With npm
  npm install @ngneat/overview@6.0.0 @ngxpert/hot-toast
  # Or with yarn
  yarn add @ngneat/overview@6.0.0 @ngxpert/hot-toast`,
      language: 'bash',
    },
    {
      title: 'Import Toaster in your app',
      subTitle: 'You can set options here',
      code: `
  // Module Setup
  import { provideHotToastConfig } from '@ngxpert/hot-toast';

  @NgModule({
    providers: [provideHotToastConfig()],
  })
  export class AppModule {}

  // Standalone Setup
  import { AppComponent } from './src/app.component';

  import { provideHotToastConfig } from '@ngxpert/hot-toast';

  bootstrapApplication(AppComponent, {
    providers: [
      provideHotToastConfig(), // @ngxpert/hot-toast providers
    ]
  });`,
      language: 'typescript',
    },
    {
      title: 'Start toasting!',
      subTitle: 'Call it from anywhere in the component',
      code: `
  import { HotToastService } from '@ngxpert/hot-toast';

  @Component({})
  export class AppComponent {
  private toastService = inject(HotToastService);

  showToast() {
    this.toastService.show('Hello World!')
  }`,
      language: 'typescript',
    },
  ];
}
