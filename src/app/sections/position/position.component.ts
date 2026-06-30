import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngxpert/hot-toast';
import { CodeComponent } from '../../shared/components/code/code.component';
import { EmojiButtonComponent } from '../../shared/components/emoji-button/emoji-button.component';

interface Position {
  id: string;
  title: ToastPosition;
  action: () => void;
  emoji: string;
  snippet: string;
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [EmojiButtonComponent, CodeComponent],
})
export class PositionComponent {
  private toast = inject(HotToastService);

  positionExamples: Position[] = [
    {
      id: 'top-left',
      title: 'top-left',
      emoji: '↖',
      snippet: `
 toast.show('I am on top-left',
    {
      icon: '↖',
      position: 'top-left'
    }
  )`,
      action: () => {
        this.toast.show('I am on top-left', { icon: '↖', position: 'top-left' });
      },
    },
    {
      id: 'top-center',
      title: 'top-center',
      emoji: '⬆',
      snippet: `
 toast.show('I am on top-center',
    {
      icon: '⬆',
      position: 'top-center'
    }
  )`,
      action: () => {
        this.toast.show('I am on top-center', { icon: '⬆', position: 'top-center' });
      },
    },
    {
      id: 'top-right',
      title: 'top-right',
      emoji: '↗',
      snippet: `
 toast.show('I am on top-right',
    {
      icon: '↗',
      position: 'top-right'
    }
  )`,
      action: () => {
        this.toast.show('I am on top-right', { icon: '↗', position: 'top-right' });
      },
    },
    {
      id: 'bottom-left',
      title: 'bottom-left',
      emoji: '↙',
      snippet: `
 toast.show('I am on bottom-left',
    {
      icon: '↙',
      position: 'bottom-left'
    }
  )`,
      action: () => {
        this.toast.show('I am on bottom-left', { icon: '↙', position: 'bottom-left' });
      },
    },
    {
      id: 'bottom-center',
      title: 'bottom-center',
      emoji: '⬇',
      snippet: `
 toast.show('I am on bottom-center',
    {
      icon: '⬇',
      position: 'bottom-center'
    }
  )`,
      action: () => {
        this.toast.show('I am on bottom-center', { icon: '⬇', position: 'bottom-center' });
      },
    },
    {
      id: 'bottom-right',
      title: 'bottom-right',
      emoji: '↘',
      snippet: `
 toast.show('I am on bottom-right',
    {
      icon: '↘',
      position: 'bottom-right'
    }
  )`,
      action: () => {
        this.toast.show('I am on bottom-right', { icon: '↘', position: 'bottom-right' });
      },
    },
  ];

  snippet = this.positionExamples[0].snippet;
  position: ToastPosition = 'top-left';

  get globalSnippet() {
    return `
  import { provideHotToastConfig } from '@ngxpert/hot-toast';

  @NgModule({
    providers: [
      provideHotToastConfig(
          {
            position: '${this.position}',
          }
        )
      ],
  })

  export class AppModule {}`;
  }

  setSnippet(pos: Position) {
    if (pos.snippet) {
      this.snippet = pos.snippet;
    }
    this.position = pos.title;
    pos.action();
  }
}
