import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly gfName = 'Helena';
  readonly startDate = new Date("2025-01-26T14:00:00");
}