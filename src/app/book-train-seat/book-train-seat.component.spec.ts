import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTrainSeatComponent } from './book-train-seat.component';

describe('BookTrainSeatComponent', () => {
  let component: BookTrainSeatComponent;
  let fixture: ComponentFixture<BookTrainSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTrainSeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTrainSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
