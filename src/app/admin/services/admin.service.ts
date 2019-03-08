import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private db: AngularFireDatabase) { }

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {
    const usersRef = this.db.list('users');
    return usersRef.snapshotChanges();
  }

  getUserProjects(uid: string) {
    const projectsRef = this.db.list('projects/' + uid);
    return projectsRef.snapshotChanges();
  }

  getUserCustomers(uid: string) {
    const customersRef = this.db.list('customers/' + uid);
    return customersRef.snapshotChanges();
  }

  checkAdminRole(uid: string) {
    return this.db.object('admins/' + uid).valueChanges();
  }

  deleteUserProject(uid: string, projectId: string) {
    return from(this.db.object(`projects/${uid}/` + projectId).remove());
  }

  deleteUserCustomer(uid: string, customerId: string) {
    return from(this.db.object(`customers/${uid}/` + customerId).remove());
  }

  addAdminPrivileges(uid: string) {
    const adminsRef = this.db.object('admins/' + uid);
    this.db.object('users/' + uid).update({ isAdmin: true });
    return from(adminsRef.set(true));
  }

  removeAdminPrivileges(uid: string) {
    this.db.object('users/' + uid).update({ isAdmin: false });
    return from(this.db.object('admins/' + uid).remove());
  }
}
