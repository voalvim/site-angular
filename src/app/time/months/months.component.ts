import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-months',
  standalone: true,  
  imports:[
    AsyncPipe, 
    DecimalPipe
  ],
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent {
  @Input() timePassed$!: Observable<TimePassed>
}
