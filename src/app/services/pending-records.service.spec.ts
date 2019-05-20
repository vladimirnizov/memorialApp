import { TestBed } from '@angular/core/testing';

import { PendingRecordsService } from './pending-records.service';

describe('PendingRecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingRecordsService = TestBed.get(PendingRecordsService);
    expect(service).toBeTruthy();
  });
});
