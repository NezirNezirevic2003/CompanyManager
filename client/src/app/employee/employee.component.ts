import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  firstname: any;
  formValue!: FormGroup;
  employeeData: any = [];
  employeeObj: EmployeeModel = new EmployeeModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  data: any = [];
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      status: ['', Validators.required],
      salary: ['', Validators.required],
      phonenumber: ['', Validators.required],
    });
    this.getEmployeeDetails();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeObj.firstame = this.formValue.value.firstname;
    this.employeeObj.lastname = this.formValue.value.lastname;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.dateOfJoining = this.formValue.value.dateOfJoining;
    this.employeeObj.status = this.formValue.value.status;
    this.employeeObj.salary = this.formValue.value.salary;
    this.employeeObj.phonenumber = this.formValue.value.phonenumber;
    this.api.PostEmployee(this.employeeObj).subscribe((res) => {
      console.log(res);
      let ref = document.getElementById('closeButton');
      ref?.click();
      var showAddSuccess = document.getElementById('success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
      this.getEmployeeDetails();
    });
  }

  getEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.data;
      // console.log(this.employeeData);
    });
  }

  editEmployeeDetail() {
    this.employeeObj.firstame = this.formValue.value.firstName;
    this.employeeObj.lastname = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.dateOfJoining = this.formValue.value.dateOfJoining;
    this.employeeObj.status = this.formValue.value.status;
    this.employeeObj.salary = this.formValue.value.salary;
    this.employeeObj.phonenumber = this.formValue.value.phonenumber;
    this.api.UpdateEmployee(this.employeeObj).subscribe((res) => {
      let ref = document.getElementById('closeButton');
      ref?.click();
      this.getEmployeeDetails();
    });
  }

  onEdit(row: any) {
    this.employeeObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['department'].setValue(row.department);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteEmployeeDetail(data: any) {
    this.api.DeleteEmployee(this.employeeObj.id).subscribe((res) => {
      let ref = document.getElementById('deleteEmployeeButton');
      ref?.click();
      this.getEmployeeDetails();
    });
  }

  onDelete(data: any) {
    this.employeeObj.id = data.id;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  Search() {
    if (this.firstname == '') {
      this.ngOnInit();
    } else {
      this.employeeData = this.employeeData.filter(
        (res: { firstname: any }) => {
          return res.firstname
            .toLocaleLowerCase()
            .match(this.firstname.toLocaleLowerCase());
        }
      );
    }
  }
}
