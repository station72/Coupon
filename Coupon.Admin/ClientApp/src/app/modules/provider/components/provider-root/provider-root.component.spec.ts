import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRootComponent } from './provider-root.component';

describe('ProviderRootComponent', () => {
  let component: ProviderRootComponent;
  let fixture: ComponentFixture<ProviderRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
