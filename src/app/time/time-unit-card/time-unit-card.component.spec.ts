import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeUnitCardComponent } from './time-unit-card.component';

describe('TimeUnitCardComponent', () => {
  let component: TimeUnitCardComponent;
  let fixture: ComponentFixture<TimeUnitCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeUnitCardComponent]
    });
    fixture = TestBed.createComponent(TimeUnitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
