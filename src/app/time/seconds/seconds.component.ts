import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-seconds',
  standalone: true,
  templateUrl: './seconds.component.html',
  styleUrls: ['./seconds.component.scss']
})
export class SecondsComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  absoluteSeconds: number = 0;
  relativeSeconds: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.absoluteSeconds = tp.seconds.absolute;
      this.relativeSeconds = tp.seconds.relative;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
