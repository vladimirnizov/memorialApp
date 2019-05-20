import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExisitnigRecordsComponent } from './exisitnig-records.component';

describe('ExisitnigRecordsComponent', () => {
  let component: ExisitnigRecordsComponent;
  let fixture: ComponentFixture<ExisitnigRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExisitnigRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExisitnigRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
