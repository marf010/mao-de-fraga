import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandles } from './admin-candles';

describe('AdminCandles', () => {
  let component: AdminCandles;
  let fixture: ComponentFixture<AdminCandles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCandles],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCandles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
