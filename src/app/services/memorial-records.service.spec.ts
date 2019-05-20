import { TestBed } from '@angular/core/testing';

import { MemorialRecordsService } from './memorial-records.service';

describe('MemorialRecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemorialRecordsService = TestBed.get(MemorialRecordsService);
    expect(service).toBeTruthy();
  });
});
