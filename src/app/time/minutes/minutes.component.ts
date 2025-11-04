import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-minutes',
  standalone: true,
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.scss']
})
export class MinutesComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  absoluteMinutes: number = 0;
  relativeMinutes: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.absoluteMinutes = tp.minutes.absolute;
      this.relativeMinutes = tp.minutes.relative;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
