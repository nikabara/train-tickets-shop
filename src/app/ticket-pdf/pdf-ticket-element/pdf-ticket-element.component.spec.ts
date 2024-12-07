import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTicketElementComponent } from './pdf-ticket-element.component';

describe('PdfTicketElementComponent', () => {
  let component: PdfTicketElementComponent;
  let fixture: ComponentFixture<PdfTicketElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfTicketElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfTicketElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
