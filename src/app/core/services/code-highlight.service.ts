import { Injectable } from '@angular/core';
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

@Injectable({
  providedIn: 'root',
})
export class CodeHighlightService {
  highlightElement(el: HTMLElement) {
    highlightElement(el);
  }
}
