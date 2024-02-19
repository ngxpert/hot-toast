import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.scss'],
    standalone: true,
})
export class FeaturesComponent implements OnInit {
  featureList = [
    'Hot by default',
    'Easy to use',
    'Accessible',
    'Reduce motion support',
    'Emoji Support',
    'Customizable',
    'Observable API',
    'Pause on hover',
    'Events',
    'Persistent',
  ];

  constructor() {}

  ngOnInit(): void {}
}
