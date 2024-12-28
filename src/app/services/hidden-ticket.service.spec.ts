import { TestBed } from '@angular/core/testing';

import { HiddenTicketService } from './hidden-ticket.service';

describe('HiddenTicketService', () => {
  let service: HiddenTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiddenTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
