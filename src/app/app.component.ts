import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './sections/footer/footer.component';
// import { JumpToDialogComponent } from './shared/components/jump-to-dialog/jump-to-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    // JumpToDialogComponent,
    RouterOutlet,
    FooterComponent,
  ],
})
export class AppComponent {
  isDialogOpen = false;
}
