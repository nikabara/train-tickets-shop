import { TestBed } from '@angular/core/testing';

import { ScheduleFilterService } from './schedule-filter.service';

describe('ScheduleFilterService', () => {
  let service: ScheduleFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
