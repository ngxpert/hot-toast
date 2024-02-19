import { Injectable } from '@angular/core';
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

@Injectable({
  providedIn: 'root',
})
export class CodeHighlightService {
  highlightElement(el: HTMLElement) {
    highlightElement(el);
  }
}
