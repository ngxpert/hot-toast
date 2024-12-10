import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonGroupItem = {
  label: string;
  value: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
};

@Component({
    selector: 'app-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    imports: [NgClass]
})
export class ButtonGroupComponent {
  @Input() buttons: ButtonGroupItem[] = [];
  @Input() selectedValue: string;
}
