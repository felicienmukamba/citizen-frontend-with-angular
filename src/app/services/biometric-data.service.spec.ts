import { TestBed } from '@angular/core/testing';

import { BiometricDataService } from './biometric-data.service';

describe('BiometricDataService', () => {
  let service: BiometricDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiometricDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
