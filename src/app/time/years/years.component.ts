import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimePassed } from 'src/app/models/time-passed.model';

@Component({
  selector: 'app-years',
  standalone: true,
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent {
  @Input() timePassed$!: Observable<TimePassed>;

  years: number = 0;
  yearsFloat: number = 0;
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.timePassed$.subscribe(tp => {
      this.years = Math.floor(tp.years);
      this.yearsFloat = tp.years;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }}
