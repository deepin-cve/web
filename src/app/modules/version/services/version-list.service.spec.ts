import { TestBed } from '@angular/core/testing';

import { VersionListService } from './version-list.service';

describe('VersionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VersionListService = TestBed.get(VersionListService);
    expect(service).toBeTruthy();
  });
});
