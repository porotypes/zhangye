import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMapsComponent } from './one-maps.component';

describe('OneMapsComponent', () => {
  let component: OneMapsComponent;
  let fixture: ComponentFixture<OneMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
