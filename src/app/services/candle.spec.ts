import { TestBed } from '@angular/core/testing';

import { Candle } from './candle';

describe('Candle', () => {
  let service: Candle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Candle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
