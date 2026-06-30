import { Component, input, ChangeDetectionStrategy, signal } from '@angular/core';
import { HighlightCodePipe } from '../../pipes/highlight-code.pipe';
import { HtmlPipe } from '../../pipes/html.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightCodePipe, HtmlPipe, ClipboardModule],
})
export class CodeComponent {
  readonly language = input('typescript');
  readonly containerClass = input<string>();
  readonly snippet = input<string>();
  readonly hideCopyButton = input(false);
  readonly selectOnFocus = input(false);

  readonly isCopied = signal(false);

  codeCopied() {
    this.isCopied.set(true);
    setTimeout(() => {
      this.isCopied.set(false);
    }, 3000);
  }
}
