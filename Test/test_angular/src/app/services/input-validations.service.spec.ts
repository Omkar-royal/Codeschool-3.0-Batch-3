import { TestBed } from '@angular/core/testing';

import { InputValidationsService } from './input-validations.service';

describe('InputValidationsService', () => {
  let service: InputValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
