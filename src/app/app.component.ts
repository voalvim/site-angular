import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly gfName = 'Helena';
  readonly startDate = new Date("2025-01-26T10:00:00");

  intervalId?: number;


  ngOnInit() {
     this.intervalId = setInterval(() => {
      console.log(new Date());
    }, 
    1000); 
  } 

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}
