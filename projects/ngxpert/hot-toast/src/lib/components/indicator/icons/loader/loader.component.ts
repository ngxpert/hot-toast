import { Component, input } from '@angular/core';

import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  readonly theme = input<IconTheme>();
}
