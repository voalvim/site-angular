import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysComponent } from './days/days.component';
import { YearsComponent } from "./years/years.component";
import { MonthsComponent } from "./months/months.component";
import { HoursComponent } from "./hours/hours.component";
import { MinutesComponent } from "./minutes/minutes.component";
import { SecondsComponent } from "./seconds/seconds.component";
import { TimePassed } from '../models/time-passed.model';
import { addDays, addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, differenceInDays, eachYearOfInterval, endOfYear, isLeapYear, startOfYear } from "date-fns";

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    CommonModule, 
    DaysComponent, 
    YearsComponent, 
    MonthsComponent, 
    HoursComponent, 
    MinutesComponent, 
    SecondsComponent
  ],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  @Input() startDate!: Date;
  intervalId?: number;
  timePassed!: TimePassed;

  ngOnInit() {
    this.timePassed = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    this.intervalId = setInterval(() => {
      this.calculateTimePassed(new Date());
      console.log(this.timePassed);
    }, 
    1000);
  } 

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  calculateTimePassed(date: Date) {
    this.timePassed.years = this.calculateYears(date);
    this.timePassed.months = this.calculateMonths(date);
    this.timePassed.days = this.calculateDays(date);
    this.timePassed.hours = this.calculateHours(date);
    this.timePassed.minutes = this.calculateMinutes(date);
    this.timePassed.seconds = this.calculateSeconds(date);
  }

  calculateYears(date: Date): number {
    // calculo a quantidade total de anos no periodo do relacionamento
    const fullYears = differenceInCalendarYears(date, this.startDate);
    
    // pego a data do ultimo aniversario
    let lastAnniversary = addYears(this.startDate, fullYears);
    // se a data atual for antes do que a data do ultimo aniversario
    if (date.getTime() < lastAnniversary.getTime()) {
        // retroceder 1 ano (quando de fato foi o ultimo aniversario)
        lastAnniversary = addYears(this.startDate, fullYears - 1);
    }
    
    // pego a data do proximo aniversario
    let nextAnniversary = addYears(this.startDate, fullYears);
    // se a data atual for maior do que a data do proximo aniversario
    if (date.getTime() > nextAnniversary.getTime()) {
        //avancar 1 mes (quando de fato sera o proximo aniversario)
        nextAnniversary = addYears(this.startDate, fullYears + 1);
    }
    
    // calculo os milisecundos desde o ultimo aniversario ate a data de hoje
    const msSinceMonthversary = date.getTime() - lastAnniversary.getTime();
    
    // calculo os milisegundos em um ano
    const msInYear = nextAnniversary.getTime() - lastAnniversary.getTime();
    
    // calculo a fracao de tempo desde o ultimo aniversario ate o final do ano atual
    const fraction = msSinceMonthversary / msInYear;
    // adiciono a fracao de tempo com os anos completos
    const years = fullYears + fraction;

    return years;
  }

  calculateMonths(date: Date): number {
    // calculo a quantidade total de meses no periodo do relacionamento
    const fullMonths = differenceInCalendarMonths(date, this.startDate);
    
    // pego a data do ultimo mesversario
    let lastMonthversary = addMonths(this.startDate, fullMonths);
    // se a data atual for antes do que a data do ultimo mesversario
    if (date.getTime() < lastMonthversary.getTime()) {
        // retroceder 1 mes (quando de fato foi o ultimo mesversario)
        lastMonthversary = addMonths(this.startDate, fullMonths - 1);
    }
    
    // pego a data do proximo mesversario
    let nextMonthversary = addMonths(this.startDate, fullMonths);
    // se a data atual for maior do que a data do proximo mesversario
    if (date.getTime() > nextMonthversary.getTime()) {
        //avancar 1 mes (quando de fato sera o proximo mesversario)
        nextMonthversary = addMonths(this.startDate, fullMonths + 1);
    }
    
    // calculo os milisecundos desde o ultimo mesversario ate a data de hoje
    const msSinceMonthversary = date.getTime() - lastMonthversary.getTime();
    
    // calculo os milisegundos em um ano
    const msInMonth = nextMonthversary.getTime() - lastMonthversary.getTime();
    
    // calculo a fracao de tempo desde o ultimo mesversario ate o final do ano atual
    const fraction = msSinceMonthversary / msInMonth;
    
    // adiciono a fracao de tempo com os meses completos
    const months = fullMonths + fraction;

    return months;
  }

  calculateDays(date: Date): number {
    // calculo a quantidade total de dias no periodo do relacionamento
    const fullDays = differenceInCalendarDays(date, this.startDate);
    
    // pego a data do ultimo diaversario
    let lastDayversary = addDays(this.startDate, fullDays);
    // se a data atual for antes do que a data do ultimo diaversario
    if (date.getTime() < lastDayversary.getTime()) {
        // retroceder 1 ano (quando de fato foi o ultimo diaversario)
        lastDayversary = addDays(this.startDate, fullDays - 1);
    }
    
    // pego a data do proximo diaversario
    let nextDayversary = addDays(this.startDate, fullDays);
    // se a data atual for maior do que a data do proximo diaversario
    if (date.getTime() > nextDayversary.getTime()) {
        //avancar 1 mes (quando de fato sera o proximo diaversario)
        nextDayversary = addDays(this.startDate, fullDays + 1);
    }

    // calculo os milisecundos desde o ultimo diaversario ate a data de hoje
    const msSinceDayversary = date.getTime() - lastDayversary.getTime();
    
    // calculo os milisegundos em um ano
    const msInYear = nextDayversary.getTime() - lastDayversary.getTime();
    
    // calculo a fracao de tempo desde o ultimo diaversario ate o final do ano atual
    const fraction = msSinceDayversary / msInYear;
    
    // adiciono a fracao de tempo com os dias completos
    const days = fullDays + fraction;

    return days;
  }

  calculateHours(date: Date): number {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    return totalHours % 24;
  }

  calculateMinutes(date: Date): number {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    return totalMinutes % 60;
  }

  calculateSeconds(date: Date): number {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    return totalSeconds % 60;
  }
    
}
