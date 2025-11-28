import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { HighlightCodePipe } from '../../pipes/highlight-code.pipe';
import { HtmlPipe } from '../../pipes/html.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  imports: [NgClass, HighlightCodePipe, HtmlPipe, ClipboardModule],
})
export class CodeComponent {
  readonly language = input('typescript');
  readonly containerClass = input<string>();
  readonly snippet = input<string>();
  readonly hideCopyButton = input(false);
  readonly selectOnFocus = input(false);

  isCopied = false;

  codeCopied() {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 3000);
  }
}
