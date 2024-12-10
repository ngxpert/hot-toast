import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { CodeHighlightService } from 'src/app/core/services/code-highlight.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss'],
    imports: [NgClass]
})
export class CodeComponent implements OnChanges {
  @Input() language = 'typescript';
  @Input() containerClass: string;
  @Input() snippet: string;

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
