import { TestBed } from '@angular/core/testing';

import { ReverseGuardGuard } from './reverse-guard.guard';

describe('ReverseGuardGuard', () => {
  let guard: ReverseGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReverseGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
