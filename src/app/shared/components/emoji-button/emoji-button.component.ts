import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-emoji-button',
  templateUrl: './emoji-button.component.html',
  styleUrls: ['./emoji-button.component.scss'],
  standalone: true,
})
export class EmojiButtonComponent {
  emoji = input<string>();
  className = input<string>();
  btnId = input<string>();
  showLink = input(false);
  disabled = input(false);
  @Output() btnClick = new EventEmitter();
}
