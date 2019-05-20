import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRecordsComponent } from './pending-records.component';

describe('PendingRecordsComponent', () => {
  let component: PendingRecordsComponent;
  let fixture: ComponentFixture<PendingRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
