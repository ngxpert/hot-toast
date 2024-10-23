import { Component, ElementRef, OnChanges, ViewChild, input } from '@angular/core';
import { CodeHighlightService } from 'src/app/core/services/code-highlight.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class CodeComponent implements OnChanges {
  language = input('typescript');
  containerClass = input<string>();
  snippet = input<string>();

  @ViewChild('code') codeTemplateRef: ElementRef<HTMLElement>;

  constructor(private codeHighlightService: CodeHighlightService) {}

  ngOnChanges(): void {
    if (this.codeTemplateRef && this.codeTemplateRef.nativeElement) {
      setTimeout(() => {
        this.codeHighlightService.highlightElement(this.codeTemplateRef.nativeElement);
      });
    }
  }
}
