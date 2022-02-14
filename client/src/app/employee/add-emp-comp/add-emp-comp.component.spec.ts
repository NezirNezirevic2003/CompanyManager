import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpCompComponent } from './add-emp-comp.component';

describe('AddEmpCompComponent', () => {
  let component: AddEmpCompComponent;
  let fixture: ComponentFixture<AddEmpCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
