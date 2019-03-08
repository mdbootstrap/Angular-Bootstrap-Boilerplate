import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Customer } from '../models/customer.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(customer: Customer, userId: string) {
    const customers = this.db.list(`customers/${userId}`);
    return customers.push(customer);
  }

  addCustomers(customers: Customer[]) {
    const userId = this.userId;

    if (userId) {
      customers.forEach( (customer: Customer) => {
        this.db.list(`customers/${userId}`).push(customer);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`customers/${userId}`).snapshotChanges();
  }

  update(customer: Customer, userId: string) {
    return of(this.db.object(`customers/${userId}/` + customer.key)
      .update({
        id: customer.id,
        name: customer.name,
        description: customer.description,
      }));
  }

  delete(customer: Customer, userId: string) {
    return this.db.object(`customers/${userId}/` + customer.key).remove();
  }
}
