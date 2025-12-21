import { TestBed } from '@angular/core/testing';

import { TrainFilterService } from './train-filter.service';

describe('TrainFilterService', () => {
  let service: TrainFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
