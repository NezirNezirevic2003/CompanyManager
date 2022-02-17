import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  bodyText!: string;
  constructor(private api: ApiService, private modalService: ModalService) {}

  employeeData!: any;
  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.employeeDetails;
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
