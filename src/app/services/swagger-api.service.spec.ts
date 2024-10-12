import { TestBed } from '@angular/core/testing';

import { SwaggerAPIService } from './swagger-api.service';

describe('SwaggerAPIService', () => {
  let service: SwaggerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwaggerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
