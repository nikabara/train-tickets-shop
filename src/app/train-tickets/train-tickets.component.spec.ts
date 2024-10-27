import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTicketsComponent } from './train-tickets.component';

describe('TrainTicketsComponent', () => {
  let component: TrainTicketsComponent;
  let fixture: ComponentFixture<TrainTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
