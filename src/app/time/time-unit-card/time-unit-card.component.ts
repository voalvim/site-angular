import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'time-unit-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule
  ],
  templateUrl: './time-unit-card.component.html',
  styleUrls: ['./time-unit-card.component.scss']
})
export class TimeUnitCardComponent {

  @Input() timeUnit!: string;
  @Input() absoluteTime!: number;
  @Input() relativeTime!: number;

  @Input() set isCollapsed(value: boolean) {
    console.log(this.timeUnit + " card isCollapsed changed to: " + value);
    this._isCollapsed = value;
  }  
  
  @Input() set isExpanded(value: boolean) {
    console.log(this.timeUnit + " card isExpanded changed to: " + value);
    this._isExpanded = value;
  }

  private _isExpanded = false;
  private _isCollapsed = false;

  get isExpanded():boolean {
    return this._isExpanded;
  }

  get isCollapsed():boolean {
    return this._isCollapsed;
  }
  
}
