import { Action } from '@ngrx/store';
import { Project } from '../models/project.model';

export enum ProjectsActionTypes {
  PROJECTS_QUERY = '[Projects] Projects query',
  PROJECTS_LOADED = '[Projects] Projects loaded',

  PROJECT_ADDED = '[Projects] Project added',

  PROJECT_EDITED = '[Projects] Project edited',
  PROJECT_DELETED = '[Projects] Project deleted',

  PROJECTS_ERROR = '[Projects] Projects error'
}

export class ProjectsQuery implements Action {
  readonly type = ProjectsActionTypes.PROJECTS_QUERY;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.PROJECTS_LOADED;

  constructor(public payload: { projects: Project[] }) {}
}

export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.PROJECT_ADDED;

  constructor(public payload: { project: Project}) {}
}

export class ProjectEdited implements Action {
  readonly type = ProjectsActionTypes.PROJECT_EDITED;

  constructor(public payload: { project: Project }) {}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.PROJECT_DELETED;

  constructor(public payload: { project: Project }) {}
}

export class ProjectsError implements Action {
  readonly type = ProjectsActionTypes.PROJECTS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ProjectsActions =
  | ProjectsQuery
  | ProjectsLoaded
  | ProjectAdded
  | ProjectEdited
  | ProjectDeleted
  | ProjectsError;
