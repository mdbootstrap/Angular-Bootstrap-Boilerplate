import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../app/reducers';

import * as fromAdmin from '../../store/admin.actions';
import { Observable } from 'rxjs';
import {
  getUsersList,
  getUserProjects,
  getSelectedUser,
  getUsersListLoading,
  getUserProjectsLoading,
  getUserCustomers,
  getUserCustomersLoading
} from '../../store/admin.selectors';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../../auth/models/user.model';
import { map, delay, take } from 'rxjs/operators';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {}

  users$: Observable<any>;
  userProjects$: Observable<Project[]>;
  userCustomers$: Observable<Customer[]>;
  usersListLoading$: Observable<boolean>;
  userProjectsLoading$: Observable<boolean>;
  userCustomersLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;

  private modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  ngOnInit() {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.userProjectsLoading$ = this.store.select(getUserProjectsLoading);
    this.userCustomersLoading$ = this.store.select(getUserCustomersLoading);
  }

  onUserSelect(user: any) {
    this.uid = user.uid;
    this.selectedUser = user;
    this.selectedUser$ = this.store.select(getSelectedUser, user.uid);
    this.userProjects$ = this.store.select(getUserProjects, user.uid).pipe(
      map(projects => {
        if (projects && projects.length !== 0) {
          return projects;
        } else {
          return null;
        }
      })
    );

    this.userCustomers$ = this.store.select(getUserCustomers, user.uid).pipe(
      map(customers => {
        if (customers && customers.length !== 0) {
          return customers;
        } else {
          return null;
        }
      })
    );
  }

  onProjectsLoad() {
    this.store.dispatch(new fromAdmin.GetUserProjects({ uid: this.uid }));
  }

  onCustomersLoad() {
    this.store.dispatch(new fromAdmin.GetUserCustomers({ uid: this.uid }));
  }

  onDetailsClose() {
    this.selectedUser = null;
  }

  openProjectConfirmModal(project: Project) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserProject({
              userId: this.selectedUser.key,
              projectId: project.key
            })
          );
        }
      });
  }

  openCustomerConfirmModal(customer: Customer) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserCustomer({
              userId: this.selectedUser.key,
              customerId: customer.key
            })
          );
        }
      });
  }

  onCustomerDelete(customer: Customer) {
    this.openCustomerConfirmModal(customer);
  }

  onProjectDelete(project: Project) {
    this.openProjectConfirmModal(project);
  }

  addAdminPrivileges(user: any) {
    this.store.dispatch(new fromAdmin.AddAdminPrivileges({ userId: user.key }));
  }

  removeAdminPrivileges(user: any) {
    this.store.dispatch(
      new fromAdmin.RemoveAdminPrivileges({ userId: user.key })
    );
  }
}
