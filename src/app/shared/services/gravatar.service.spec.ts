import { TestBed } from '@angular/core/testing';

import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GravatarService = TestBed.get(GravatarService);
    expect(service).toBeTruthy();
  });
});
