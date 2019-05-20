import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManziahComponent } from './manziah.component';

describe('ManziahComponent', () => {
  let component: ManziahComponent;
  let fixture: ComponentFixture<ManziahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManziahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManziahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
