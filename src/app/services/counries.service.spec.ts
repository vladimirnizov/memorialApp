import { TestBed } from '@angular/core/testing';

import { CounriesService } from './counries.service';

describe('CounriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounriesService = TestBed.get(CounriesService);
    expect(service).toBeTruthy();
  });
});
