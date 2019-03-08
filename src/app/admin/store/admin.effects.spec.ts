import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AdminEffects } from './admin.effects';

describe('AdminEffects', () => {
  let actions$: Observable<any>;
  let effects: AdminEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AdminEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
