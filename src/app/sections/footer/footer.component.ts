import { Component } from '@angular/core';
import { REPO_URL } from 'src/app/core/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  repoUrl = REPO_URL;
}
