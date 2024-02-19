import { Component, OnInit } from '@angular/core';
import { REPO_URL } from 'src/app/core/constants';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent implements OnInit {
  repoUrl = REPO_URL;

  constructor() {}

  ngOnInit(): void {}
}
