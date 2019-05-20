import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemorialComponent } from './create-memorial.component';

describe('CreateMemorialComponent', () => {
  let component: CreateMemorialComponent;
  let fixture: ComponentFixture<CreateMemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
