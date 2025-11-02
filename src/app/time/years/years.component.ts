import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-years',
  standalone: true,
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent {
  @Input() startDate?: Date;
}
