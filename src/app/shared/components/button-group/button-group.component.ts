import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export interface ButtonGroupItem {
  label: string;
  value: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
}

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ButtonGroupComponent {
  readonly buttons = input<ButtonGroupItem[]>([]);
  readonly selectedValue = input<string>();
}
