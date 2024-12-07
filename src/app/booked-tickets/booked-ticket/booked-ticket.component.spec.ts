import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTicketComponent } from './booked-ticket.component';

describe('BookedTicketComponent', () => {
  let component: BookedTicketComponent;
  let fixture: ComponentFixture<BookedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
