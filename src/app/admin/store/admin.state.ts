// import { Project } from 'src/app/projects/models/project.model';

export interface AdminState {
    usersList: any[];
    usersListLoading: boolean;
    userProjects: any;
    userProjectsLoading: boolean;
    userCustomers: any;
    userCustomersLoading: boolean;
    error: any;
}

export const adminInitialState: AdminState = {
    usersList: [],
    usersListLoading: false,
    userProjects: {},
    userProjectsLoading: false,
    userCustomers: {},
    userCustomersLoading: false,
    error: null
};
