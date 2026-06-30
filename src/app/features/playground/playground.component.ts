import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLAYGROUND_ITEMS } from './playground';
import { CodeComponent } from '../../shared/components/code/code.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [FormsModule, RouterLink, CodeComponent, NgComponentOutlet],
  templateUrl: './playground.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
  snippetLanguages: { label: string; value: 'ts' | 'html' | 'scss' | 'css' }[] = [
    { label: 'TypeScript', value: 'ts' },
    { label: 'HTML', value: 'html' },
    { label: 'SCSS', value: 'scss' },
    { label: 'CSS', value: 'css' },
  ];

  allDemos = PLAYGROUND_ITEMS;
  searchTerm = signal('');
  demos = computed(() => {
    const searchTerm = this.searchTerm();
    if (!searchTerm) {
      return this.allDemos;
    }
    return this.allDemos.filter(
      (demo) =>
        demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demo.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });
}
