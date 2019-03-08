import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { AppState } from '../../reducers/index';
import { ProjectsState } from './projects.state';

export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjects = createSelector(
  getProjectsState,
  projects => projects.projects
);

export const getAllLoaded = createSelector(
  getProjectsState,
  projects => projects.loading
);

export const getError = createSelector(
  getProjectsState,
  projects => projects.error
);
