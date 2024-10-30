import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaySelectComponent } from './week-day-select.component';

describe('WeekDaySelectComponent', () => {
  let component: WeekDaySelectComponent;
  let fixture: ComponentFixture<WeekDaySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDaySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekDaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
