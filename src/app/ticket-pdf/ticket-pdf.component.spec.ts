import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPdfComponent } from './ticket-pdf.component';

describe('TicketPdfComponent', () => {
  let component: TicketPdfComponent;
  let fixture: ComponentFixture<TicketPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
