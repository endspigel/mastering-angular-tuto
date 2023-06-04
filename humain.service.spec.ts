import { TestBed } from '@angular/core/testing';

import { HumainService } from './humain.service';

describe('HumainService', () => {
  let service: HumainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
