import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSoapsComponent } from './admin-soaps';

describe('AdminSoaps', () => {
  let component: AdminSoapsComponent;
  let fixture: ComponentFixture<AdminSoapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSoapsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSoapsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
