import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-months',
  standalone: true,
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss'],
  imports: [MatCardModule]
})
export class MonthsComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  absoluteMonths: number = 0;
  relativeMonths: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.absoluteMonths = tp.months.absolute;
      this.relativeMonths = tp.months.relative;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
