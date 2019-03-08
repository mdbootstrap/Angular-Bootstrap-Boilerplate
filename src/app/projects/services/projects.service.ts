import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = environment.firebase.databaseURL;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(project: Project, userId: string) {
    const projects = this.db.list(`projects/${userId}`);
    return projects.push(project);
  }

  addProjects(projects: Project[]) {
    const userId = this.userId;
    projects.forEach( (project: Project) => {
      this.db.list(`projects/${userId}`).push(project);
    });
  }

  get(userId: string) {
    return this.db.list(`projects/${userId}`).snapshotChanges();
  }

  update(project: Project, userId: string) {
    return of(this.db.object(`projects/${userId}/` + project.key)
      .update({
        title: project.title,
        description: project.description,
        photoUrl: project.photoUrl
      }));
  }

  delete(project: Project, userId: string) {
    return this.db.object(`projects/${userId}/` + project.key).remove();
  }
}
