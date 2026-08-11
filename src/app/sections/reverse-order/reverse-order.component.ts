import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { CodeComponent } from '../../shared/components/code/code.component';
import { EmojiButtonComponent } from '../../shared/components/emoji-button/emoji-button.component';

@Component({
  selector: 'app-reverse-order',
  templateUrl: './reverse-order.component.html',

  imports: [EmojiButtonComponent, CodeComponent],
})
export class ReverseOrderComponent {
  private toast = inject(HotToastService);

  reversOrder: boolean;
  constructor() {
    this.reversOrder = this.toast.defaultConfig.reverseOrder;
  }

  get snippet() {
    return `
  import { provideHotToastConfig } from '@ngxpert/hot-toast';

  @NgModule({
    providers: [
      provideHotToastConfig(
          {
            reverseOrder: ${this.reversOrder},
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
        reverseOrder: ${this.reversOrder}
      };
    }
  }`;
  }

  toggleOrder() {
    this.reversOrder = !this.reversOrder;

    this.toast.defaultConfig = { ...this.toast.defaultConfig, reverseOrder: this.reversOrder };

    this.showToasts();
  }

  private showToasts() {
    ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].forEach((num, i) => {
      setTimeout(() => {
        this.toast.show('Notification ' + (i + 1), { icon: num });
      }, i * 250);
    });
  }
}
