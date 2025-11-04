import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-hours',
  standalone: true,
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  absoluteHours: number = 0;
  relativeHours: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.absoluteHours = tp.hours.absolute;
      this.relativeHours = tp.hours.relative;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
