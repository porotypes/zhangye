import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningRulesComponent } from './warning-rules.component';

describe('WarningRulesComponent', () => {
  let component: WarningRulesComponent;
  let fixture: ComponentFixture<WarningRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
