import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-emoji-button',
    templateUrl: './emoji-button.component.html',
    styleUrls: ['./emoji-button.component.scss'],
    standalone: true,
    imports: [NgStyle],
})
export class EmojiButtonComponent {
  @Input() emoji: string;
  @Input() className: string;
  @Input() btnId: string;
  @Output() btnClick = new EventEmitter();
  @Input() showLink = false;
  @Input() disabled = false;
}
