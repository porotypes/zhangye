import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningLevelComponent } from './warning-level.component';

describe('WarningLevelComponent', () => {
  let component: WarningLevelComponent;
  let fixture: ComponentFixture<WarningLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
