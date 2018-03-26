import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSpotComponent } from './data-spot.component';

describe('DataSpotComponent', () => {
  let component: DataSpotComponent;
  let fixture: ComponentFixture<DataSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
