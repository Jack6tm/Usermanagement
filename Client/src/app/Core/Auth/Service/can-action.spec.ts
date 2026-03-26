import { TestBed } from '@angular/core/testing';

import { CanAction } from './can-action';

describe('CanAction', () => {
  let service: CanAction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanAction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
