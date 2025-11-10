import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Observable, Subscription } from 'rxjs';

import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-years',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  relativeYears: number = 0;
  absoluteYears: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.absoluteYears = Math.floor(tp.years.relative);
      this.relativeYears = tp.years.absolute;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
