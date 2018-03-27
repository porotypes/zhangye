import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningLevelsComponent } from './warning-levels.component';

describe('WarningLevelsComponent', () => {
  let component: WarningLevelsComponent;
  let fixture: ComponentFixture<WarningLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
