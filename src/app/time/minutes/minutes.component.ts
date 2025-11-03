import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-minutes',
  standalone: true,  
  imports:[
    AsyncPipe, 
    DecimalPipe
  ],
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.scss']
})
export class MinutesComponent {
  @Input() timePassed$!: Observable<TimePassed>
}
