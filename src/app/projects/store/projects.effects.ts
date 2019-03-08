import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjectsActionTypes } from './projects.actions';
import { Store, select } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { of } from 'rxjs';
import { ProjectsService } from '../services/projects.service';

import * as fromProjects from './../store/projects.actions';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class ProjectsEffects {

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.PROJECTS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.projectsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const projectsData: Project[] = data.map((res: any) => {
            const key = res.payload.key;
            const project: Project = res.payload.val();
            return {
              key: key || null,
              title: project.title || null,
              description: project.description || null,
              photoUrl: project.photoUrl || null
            };
          });
          return (new fromProjects.ProjectsLoaded({ projects: projectsData }));
        }),
        catchError(error => of(new fromProjects.ProjectsError({ error })))
      );
    }),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.PROJECT_ADDED),
    map((action: fromProjects.ProjectDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.projectsService.add(payload.project, user.uid))
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.PROJECT_DELETED),
    map((action: fromProjects.ProjectDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.projectsService.delete(payload.project, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.PROJECT_EDITED),
    map((action: fromProjects.ProjectEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.projectsService.update(payload.project, user.uid)
    )
  );

}
