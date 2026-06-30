import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FeaturesComponent {
  featureList = [
    'Hot by default',
    'Easy to use',
    'Snackbar variation',
    'Accessible',
    'Reduce motion support',
    'Emoji Support',
    'Customizable',
    'Observable API',
    'Pause on hover',
    'Events',
    'Persistent',
    'Grouping',
  ];
}
