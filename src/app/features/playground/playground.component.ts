import { Component, computed, inject, model, signal, Type } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotToastService, ToastOptions } from '@ngxpert/hot-toast';
import { PLAYGROUND_ITEMS } from './playground';
import { PlaygroundSchema } from './playground-schema';
import { CodeComponent } from '../../shared/components/code/code.component';
import { isComponent } from '@ngneat/overview';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink, CodeComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
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
        demo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  private toast = inject(HotToastService);

  playDemo(demo: PlaygroundSchema) {
    this.toast[demo.type ?? 'show'](demo.message, demo.options);
  }

  stringify(value: ToastOptions<unknown>) {
    let icon = value.icon;
    if (isComponent(icon)) {
      icon = (icon as Type<unknown>).name;
    } else {
      // icon = icon.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return `
${JSON.stringify({ ...value, icon }, null, 2)}`;
  }
}
