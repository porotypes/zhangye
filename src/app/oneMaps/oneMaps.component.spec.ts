import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMapsComponent } from './oneMaps.component';

describe('UserComponent', () => {
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
