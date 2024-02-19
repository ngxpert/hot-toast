import { Component } from '@angular/core';
import { HotToastService, ToastStacking } from '@ngxpert/hot-toast';
import { ButtonGroupItem } from 'src/app/shared/components/button-group/button-group.component';
import { CodeComponent } from '../../shared/components/code/code.component';
import { FormsModule } from '@angular/forms';
import { ButtonGroupComponent } from '../../shared/components/button-group/button-group.component';

@Component({
    selector: 'app-stacking',
    templateUrl: './stacking.component.html',
    standalone: true,
    imports: [
        ButtonGroupComponent,
        FormsModule,
        CodeComponent,
    ],
})
export class StackingComponent {
  stacking: ToastStacking;
  visibleToasts = 5;
  readonly stackingButtons: ButtonGroupItem[] = [
    {
      label: 'Vertical',
      value: 'vertical',
      icon: 'assets/swap_vert.svg',
      onClick: () => {
        this.toggleStacking('vertical');
      },
    },
    {
      label: 'Depth',
      value: 'depth',
      icon: 'assets/stacks.svg',
      onClick: () => {
        this.toggleStacking('depth');
      },
    },
  ];
  constructor(private toast: HotToastService) {
    this.stacking = this.toast.defaultConfig.stacking;
  }

  get snippet() {
    return `
  import { provideHotToastConfig } from '@ngxpert/hot-toast';

  @NgModule({
    providers: [
      provideHotToastConfig(
          {
            stacking: "${this.stacking}",
            visibleToasts: ${this.visibleToasts}
          }
        )
      ],
  })

  export class AppModule {}`;
  }

  get serviceSnippet() {
    return `
  import { Component } from '@angular/core';
  import { HotToastService } from '@ngxpert/hot-toast';
  @Component({
    selector: 'app-root'
  })
  export class AppComponent {

    constructor(private toast: HotToastService) {
      this.toast.defaultConfig = {
        ...this.toast.defaultConfig,
        stacking: "${this.stacking}",
        visibleToasts: ${this.visibleToasts}
      };
    }
  }`;
  }

  toggleStacking(stacking: ToastStacking) {
    this.stacking = stacking;

    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      stacking: this.stacking,
      visibleToasts: this.visibleToasts,
    };

    this.showToasts();
  }

  private showToasts() {
    ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].forEach((num, i) => {
      setTimeout(() => {
        this.toast.show('Notification ' + (i + 1), { icon: num, style: { width: '250px', height: '48px' } });
      }, i * 500);
    });
  }
}
