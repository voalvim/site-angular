import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-hours',
  standalone: true,  
  imports:[
    AsyncPipe, 
    DecimalPipe
  ],
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent {
  @Input() timePassed$!: Observable<TimePassed>
}
