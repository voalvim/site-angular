import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-minutes',
  standalone: true,
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.scss'],
  imports: [MatCardModule]
})
export class MinutesComponent {
  @Input() timePassed$!: Observable<TimePassed>;
  private _isExpanded = false;
  
  @Input() set isExpanded(value: boolean) {
    console.log('YearsComponent isExpanded changed to: ', value);
    this._isExpanded = value;
  }  
  get isExpanded():boolean {
    return this._isExpanded;
  }

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