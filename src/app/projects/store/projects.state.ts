import { Project } from '../models/project.model';

export interface ProjectsState {
  projects: Project[] | null;
  loading: boolean;
  error: any;
}

export const projectsInitialState: ProjectsState = {
  projects: null,
  loading: false,
  error: null
};
