import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMemorialComponent } from './search-memorial.component';

describe('SearchMemorialComponent', () => {
  let component: SearchMemorialComponent;
  let fixture: ComponentFixture<SearchMemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
