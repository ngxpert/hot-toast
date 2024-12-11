import { Pipe, PipeTransform } from '@angular/core';
import highlightJs from 'highlight.js';

@Pipe({
  name: 'highlightCode',
  standalone: true,
})
export class HighlightCodePipe implements PipeTransform {
  transform(value: string | null | undefined, language = 'typescript'): string {
    return value
      ? highlightJs.highlight(value, {
          language: language.toLowerCase() === 'ts' ? 'typescript' : language,
        }).value
      : '';
  }
}
