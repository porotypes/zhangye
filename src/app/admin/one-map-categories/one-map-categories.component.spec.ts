import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMapsCategoriesComponent } from './one-maps-categories.component';

describe('OneMapsCategoriesComponent', () => {
  let component: OneMapsCategoriesComponent;
  let fixture: ComponentFixture<OneMapsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneMapsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMapsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
