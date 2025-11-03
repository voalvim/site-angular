import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-seconds',
  standalone: true,  
  imports:[
    AsyncPipe, 
    DecimalPipe
  ],
  templateUrl: './seconds.component.html',
  styleUrls: ['./seconds.component.scss']
})
export class SecondsComponent {
  @Input() timePassed$!: Observable<TimePassed>
}
