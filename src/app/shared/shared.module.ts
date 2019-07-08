import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule
} from 'angular-bootstrap-md';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    ProjectModalComponent,
    ProjectsListComponent,
    ProjectComponent,
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ButtonsModule,
    CardsModule
  ],
  exports: [ProjectsListComponent, ProjectComponent, CustomersListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    ProjectModalComponent
  ]
})
export class SharedModule {}
