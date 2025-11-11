import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehaviorSubject, interval, Subscription } from 'rxjs';

import { TimePassed } from '../models/time-passed.model';
import { addDays, addMonths, addYears, differenceInCalendarDays, differenceInCalendarYears, differenceInMonths } from "date-fns";
import { TimeRepresentation } from '../models/time-representation.model';
import { TimeUnitCardComponent } from './time-unit-card/time-unit-card.component';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    CommonModule,
    TimeUnitCardComponent
  ],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  @Input() startDate!: Date;
  intervalId?: number;
  expandedCard: 'YEARS' | 'MONTHS' | 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS' | null = null;
  timePassed!: TimePassed;
  timePassed$!: BehaviorSubject<TimePassed>;
  private timerSub?: Subscription;

  ngOnInit() {
    const initialTimePassed = this.calculateTimePassed(new Date());
    this.timePassed$ = new BehaviorSubject<TimePassed>(initialTimePassed);

    this.timerSub = interval(1000).subscribe(() => {
      const newTimePassed = this.calculateTimePassed(new Date());
      this.timePassed$.next(newTimePassed);
    });
  } 

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

   calculateTimePassed(date: Date): TimePassed {
    return {
      years: this.calculateYears(date),
      months: this.calculateMonths(date),
      days: this.calculateDays(date),
      hours: this.calculateHours(date),
      minutes: this.calculateMinutes(date),
      seconds: this.calculateSeconds(date)
    }
  } 

  private getLastMonthversary( currentDate: Date, startDate: Date ): { fullMonths: number, lastMonthversary: Date } {
    const fullMonths = differenceInMonths(currentDate, startDate);
    let lastMonthversary = addMonths(this.startDate, fullMonths);

    if (currentDate.getTime() < lastMonthversary.getTime()) {
        // retroceder 1 mes (quando de fato foi o ultimo mesversario)
        lastMonthversary = addMonths(this.startDate, fullMonths - 1);
    }
    return {
      fullMonths, lastMonthversary
    };
  }

  calculateYears(date: Date): TimeRepresentation {
    if (!this.startDate) return { absolute: 0, relative: 0 };
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

    return {
      absolute: Number(years.toFixed(6)),
      relative: Math.floor(years)
    };
  }

  calculateMonths(date: Date): TimeRepresentation {
    let { fullMonths, lastMonthversary } = this.getLastMonthversary(date, this.startDate);
    // calculo a quantidade total de meses no periodo do relacionamento
    // const fullMonths = differenceInCalendarMonths(date, this.startDate);
    
    // pego a data do ultimo mesversario
    //let lastMonthversary = addMonths(this.startDate, fullMonths);
    // se a data atual for antes do que a data do ultimo mesversario
    
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

    return {
      absolute: Math.floor(months),
      relative: (fullMonths % 12)
    };
  }

  calculateDays(date: Date): TimeRepresentation {
    let { fullMonths, lastMonthversary } = this.getLastMonthversary(date, this.startDate);

    // calculo a quantidade total de dias no periodo do relacionamento
    const fullDays = differenceInCalendarDays(date, this.startDate);
    const monthDays = differenceInCalendarDays(date, lastMonthversary);
    
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

    return {
      absolute: Math.floor(days),
      relative: monthDays
    };
  }

  calculateHours(date: Date): TimeRepresentation {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const relativeHours = totalHours % 24;
    
    return {
      absolute: totalHours, 
      relative: relativeHours
    }
  }

  calculateMinutes(date: Date): TimeRepresentation {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const relativeMinutes = totalMinutes % 60;

    return {
      absolute: totalMinutes,
      relative: relativeMinutes
    }
  }

  calculateSeconds(date: Date): TimeRepresentation {
    const diffMs = date.getTime() - this.startDate.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const relativeSeconds = totalSeconds % 60;

    return {
      absolute: totalSeconds,
      relative: relativeSeconds
    }
  }
  
  expand(expandedCard: 'YEARS' | 'MONTHS' | 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS') {
    if (this.expandedCard == expandedCard) {
      this.expandedCard = null;
    } else this.expandedCard = expandedCard;
  }
}
