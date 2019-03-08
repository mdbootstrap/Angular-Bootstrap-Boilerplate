import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  @Input() users: any[];
  @Output() userSelected = new EventEmitter<any>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onUserSelected(user: any) {
    this.userSelected.emit(user);
  }

  onAddAdmin(user: any) {
    this.addAdmin.emit(user);
  }

  onRemoveAdmin(user: any) {
    this.removeAdmin.emit(user);
  }

  trackByFn(index: any) {
    return index;
  }

}
