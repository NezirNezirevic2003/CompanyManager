import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  formValue!: FormGroup;
  employeeData: any = [];
  employeeObj: EmployeeModel = new EmployeeModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  row: any = [];
  @Input() receive!: string;
  @Input() mobileSpecification!: any;
  role: string = '';
  EmployeeNameFilter: string = '';
  EmployeeListWithoutFilter: any = [];
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNumber: [''],
      salary: [''],
      department: [''],
    });
    this.getEmployeeDetails();
    this.role = localStorage.getItem('userType')!;
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeObj.FirstName = this.formValue.value.firstName;
    this.employeeObj.LastName = this.formValue.value.lastName;
    this.employeeObj.Email = this.formValue.value.email;
    this.employeeObj.MobileNumber = this.formValue.value.mobileNumber;
    this.employeeObj.Salary = this.formValue.value.salary;
    this.employeeObj.Department = this.formValue.value.department;
    this.api.PostEmployee(this.employeeObj).subscribe((res) => {
      console.log(res);
      let ref = document.getElementById('closeButton');
      ref?.click();
      this.getEmployeeDetails();
    });
  }

  getEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.employeeDetails;
    });
  }

  editEmployeeDetail() {
    this.employeeObj.FirstName = this.formValue.value.firstName;
    this.employeeObj.LastName = this.formValue.value.lastName;
    this.employeeObj.Email = this.formValue.value.email;
    this.employeeObj.MobileNumber = this.formValue.value.mobileNumber;
    this.employeeObj.Salary = this.formValue.value.salary;
    this.employeeObj.Department = this.formValue.value.department;
    this.api.UpdateEmployee(this.employeeObj).subscribe((res) => {
      let ref = document.getElementById('closeButton');
      ref?.click();
      this.getEmployeeDetails();
    });
  }

  onEdit(row: any) {
    this.employeeObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['department'].setValue(row.department);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteEmployeeDetail(row: any) {
    this.api.DeleteEmployee(this.employeeObj.Id).subscribe((res) => {
      let ref = document.getElementById('deleteEmployeeButton');
      ref?.click();
      this.getEmployeeDetails();
    });
  }

  onDelete(row: any) {
    this.employeeObj.Id = row.id;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  FilterFn(): void {
    var EmployeeNameFilter = this.EmployeeNameFilter;

    this.employeeData = this.EmployeeListWithoutFilter.filter(function (el: {
      firstName: { toString: () => string };
    }) {
      return el.firstName
        .toString()
        .toLowerCase()
        .includes(EmployeeNameFilter.toString().trim().toLowerCase());
    });
  }

  sortResult(prop: string | number, asc: any): void {
    this.employeeData = this.EmployeeListWithoutFilter.sort(function (
      a: { [x: string]: number },
      b: { [x: string]: number }
    ) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
function click(button: HTMLElement | null) {
  throw new Error('Function not implemented.');
}
