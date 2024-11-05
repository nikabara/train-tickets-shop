import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTicketInfoComponent } from './selected-ticket-info.component';

describe('SelectedTicketInfoComponent', () => {
  let component: SelectedTicketInfoComponent;
  let fixture: ComponentFixture<SelectedTicketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTicketInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
