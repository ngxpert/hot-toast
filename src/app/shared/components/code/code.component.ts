import { Component, Input } from '@angular/core';
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
  @Input() language = 'typescript';
  @Input() containerClass: string;
  @Input() snippet: string;
  @Input() hideCopyButton = false;
  @Input() selectOnFocus = false;

  isCopied = false;

  codeCopied() {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 3000);
  }
}
