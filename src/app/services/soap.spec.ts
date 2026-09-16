import { TestBed } from '@angular/core/testing';

import { Soap } from './soap';

describe('Soap', () => {
  let service: Soap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Soap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
