import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArrangements } from './admin-arrangements';

describe('AdminArrangements', () => {
  let component: AdminArrangements;
  let fixture: ComponentFixture<AdminArrangements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArrangements],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminArrangements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
