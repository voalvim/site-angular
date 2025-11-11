import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Observable, Subscription } from 'rxjs';

import { TimePassed } from 'src/app/models/time-passed.model';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-years',
  standalone: true,
  imports: [
    MatCardModule,
    BrowserAnimationsModule
],
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent {
  @Input() timePassed$!: Observable<TimePassed>;
  private _isExpanded = false;
  private _isCollapsed = false;

  @Input() set isCollapsed(value: boolean) {
    console.log('YearsComponent isCollapsed changed to: ', value);
    this._isCollapsed = value;
  }  
  
  @Input() set isExpanded(value: boolean) {
    console.log('YearsComponent isExpanded changed to: ', value);
    this._isExpanded = value;
  } 

  get isExpanded():boolean {
    return this._isExpanded;
  }

  get isCollapsed():boolean {
    return this._isCollapsed;
  }

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