import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-days',
  standalone: true,  
  imports:[
    AsyncPipe, 
    DecimalPipe
  ],
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent {
  @Input() timePassed$!: Observable<TimePassed>
}
