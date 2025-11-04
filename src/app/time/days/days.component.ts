import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-days',
  standalone: true,
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent {
  @Input() timePassed$!: Observable<TimePassed>;

    absoluteDays: number = 0;
    relativeDays: number = 0;
    private sub?: Subscription;
  
    ngOnInit() {
      this.sub = this.timePassed$.subscribe(tp => {
        this.absoluteDays = tp.days.absolute;
        this.relativeDays = tp.days.relative;
      });
    }
  
    ngOnDestroy() {
      this.sub?.unsubscribe();
    }
}
