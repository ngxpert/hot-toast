import { Component, EventEmitter, Output, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-emoji-button',
  templateUrl: './emoji-button.component.html',
  styleUrls: ['./emoji-button.component.scss'],
  standalone: true,
  imports: [NgStyle],
})
export class EmojiButtonComponent {
  readonly emoji = input<string>();
  readonly className = input<string>();
  readonly btnId = input<string>();
  @Output() btnClick = new EventEmitter();
  readonly showLink = input(false);
  readonly disabled = input(false);
}
