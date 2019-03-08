import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProjectsEffects } from './projects.effects';

describe('ProjectsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProjectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProjectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
