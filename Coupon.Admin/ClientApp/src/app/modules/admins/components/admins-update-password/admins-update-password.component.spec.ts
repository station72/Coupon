import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsUpdatePasswordComponent } from './admins-update-password.component';

describe('AdminsUpdatePasswordComponent', () => {
  let component: AdminsUpdatePasswordComponent;
  let fixture: ComponentFixture<AdminsUpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsUpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
