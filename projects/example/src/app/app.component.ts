import { Component } from '@angular/core';
import { ActionSheetComponent, DialogComponent, FullscreenDialogComponent } from 'ngx-concern';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ActionSheetComponent, DialogComponent, FullscreenDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
