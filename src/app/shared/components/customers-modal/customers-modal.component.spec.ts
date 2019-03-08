import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersModalComponent } from './customers-modal.component';

describe('CustomersModalComponent', () => {
  let component: CustomersModalComponent;
  let fixture: ComponentFixture<CustomersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
