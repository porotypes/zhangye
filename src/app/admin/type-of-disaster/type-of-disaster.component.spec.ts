import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfDisasterComponent } from './type-of-disaster.component';

describe('TypeOfDisasterComponent', () => {
  let component: TypeOfDisasterComponent;
  let fixture: ComponentFixture<TypeOfDisasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfDisasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfDisasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
