import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromCustomers from './../store/customers.actions';
import { Customer } from '../models/customer.model';
import { Subscription, Observable } from 'rxjs';
import { getCustomers, getIsLoading } from '../store/customers.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { CustomersModalComponent } from '../../shared/components/customers-modal/customers-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  customers: Customer[] | null;
  modalRef: MDBModalRef;

  customersSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastCustomerIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.customersSub = this.store.select(getCustomers).pipe(
      map( (customers: Customer[]) => {
        if (this.user && !customers) {
          this.store.dispatch(new fromCustomers.CustomersQuery());
        }
        return customers;
      })
    )
    .subscribe( (customers: Customer[]) => {
      if (customers && customers.length !== 0) {
        const index: number = Number(customers[customers.length - 1].id);
        this.lastCustomerIndex = index;
      } else {
        this.lastCustomerIndex = 0;
      }

      this.customers = customers;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.customersSub) {
      this.customersSub.unsubscribe();
    }
  }

  onAddCustomer() {
    this.modalRef = this.modalService.show(CustomersModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new customer';
    this.modalRef.content.customer.id = this.lastCustomerIndex + 1;

    this.modalRef.content.customerData.pipe(take(1)).subscribe( (customerData: Customer) => {
      this.store.dispatch(new fromCustomers.CustomersAdded({ customer: customerData }));
    });
  }

  openEditCustomerModal(customer: Customer) {
    this.modalRef = this.modalService.show(CustomersModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit customer';
    const customerCopy = {
      key: customer.key,
      id: customer.id || null,
      name: customer.name || null,
      description: customer.description || null
     };
    this.modalRef.content.customer = customerCopy;

    this.modalRef.content.customerData.pipe(take(1)).subscribe( (customerData: Customer) => {
      this.store.dispatch(new fromCustomers.CustomersEdited({ customer: customerData }));
    });
  }

  openConfirmModal(customer: Customer) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromCustomers.CustomersDeleted({ customer }));
      }
    });
  }

  onCustomerEdit(customer: Customer) {
    this.openEditCustomerModal(customer);
  }

  onCustomerDelete(customer: Customer) {
    this.openConfirmModal(customer);
  }

}
