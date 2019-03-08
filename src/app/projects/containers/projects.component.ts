import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Project } from '../models/project.model';
import { AppState } from '../../reducers/index';
import { Store, select } from '@ngrx/store';
import * as fromProjects from './../store/projects.actions';
import { Observable } from 'rxjs';
import { getProjects, getAllLoaded } from '../store/projects.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[] | null>;
  isLoading$: Observable<boolean>;
  modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(private store: Store<AppState>, private modalService: MDBModalService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getAllLoaded);
    this.projects$ = this.store.pipe(
      select(getProjects),
      map( (projects: Project[]) => {
        if (this.user && !projects) {
          this.store.dispatch(new fromProjects.ProjectsQuery());
        }
        return projects;
      })
    );
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  openAddProjectModal() {
    this.modalRef = this.modalService.show(ProjectModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new project';

    this.modalRef.content.projectData.pipe(take(1)).subscribe( (projectData: Project) => {
      this.store.dispatch(new fromProjects.ProjectAdded({ project: projectData }));
    });
  }

  openEditProjectModal(project: Project) {
    this.modalRef = this.modalService.show(ProjectModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit project';
    const projectCopy = {...project };
    this.modalRef.content.project = projectCopy;

    this.modalRef.content.projectData.pipe(take(1)).subscribe( (projectData: Project) => {
      this.store.dispatch(new fromProjects.ProjectEdited({ project: projectData }));
    });
  }

  openConfirmModal(project: Project) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromProjects.ProjectDeleted({ project }));
      }
    });
  }

  onProjectDelete(project: Project) {
    this.openConfirmModal(project);
  }

  onProjectEdit(project: Project) {
    this.openEditProjectModal(project);
  }

}
