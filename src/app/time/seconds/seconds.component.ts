import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-seconds',
  standalone: true,
  templateUrl: './seconds.component.html',
  styleUrls: ['./seconds.component.scss'],
  imports: [MatCardModule]
})
export class SecondsComponent {
  @Input() timePassed$!: Observable<TimePassed>;
  private _isExpanded = false;
  
  @Input() set isExpanded(value: boolean) {
    console.log('YearsComponent isExpanded changed to: ', value);
    this._isExpanded = value;
  }  
  get isExpanded():boolean {
    return this._isExpanded;
  }

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
