import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { ProjectsService } from '../../projects/services/projects.service';
import { CustomersService } from '../../customers/services/customers.service';
import { getUser } from '../../auth/store/auth.selectors';
import { switchMap, take } from 'rxjs/operators';
import { Customer } from '../../customers/models/customer.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;
  projects = [
    {
      title: 'Project 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg'
    },
    {
      title: 'Project 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg'
    },
    {
      title: 'Project 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(99).jpg'
    },
    {
      title: 'Project 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(95).jpg'
    }
  ];

  customersSub: Subscription;
  customers: Customer[] = [
    {
      id: 1,
      name: 'Example customer 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      name: 'Example customer 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      name: 'Example customer 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      name: 'Example customer 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      name: 'Example customer 5',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  constructor(
    private store: Store<AppState>,
    private projectsService: ProjectsService,
    private customersService: CustomersService
  ) {}

  ngOnInit() {
    this.initProjects();
    this.initCustomers();
  }

  ngOnDestroy() {
    if (this.projectsSub) {
      this.projectsSub.unsubscribe();
    }

    if (this.customersSub) {
      this.customersSub.unsubscribe();
    }
  }

  initProjects() {
    this.projectsSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.projectsService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(projects => {
        if (projects.length === 0) {
          this.projectsService.addProjects(this.projects);
        }
      });
  }

  initCustomers() {
    this.customersSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.customersService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(customers => {
        if (customers.length === 0) {
          this.customersService.addCustomers(this.customers);
        }
      });
  }
}
