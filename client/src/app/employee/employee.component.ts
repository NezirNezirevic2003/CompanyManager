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
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(6)]],
      dateOfJoining: ['', Validators.required],
      status: ['', Validators.required],
      salary: ['', [Validators.required, Validators.minLength(1)]],
      phonenumber: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.getEmployeeDetails();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeObj.firstname = this.formValue.value.firstname;
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

  editEmployeeDetail(id: any) {
    this.employeeObj.firstname = this.formValue.value.firstname;
    this.employeeObj.lastname = this.formValue.value.lastname;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.dateOfJoining = this.formValue.value.dateOfJoining;
    this.employeeObj.status = this.formValue.value.status;
    this.employeeObj.salary = this.formValue.value.salary;
    this.employeeObj.phonenumber = this.formValue.value.phonenumber;
    this.api
      .UpdateEmployee(this.employeeObj, this.employeeObj.id)
      .subscribe((res) => {
        let ref = document.getElementById('closeButton');
        ref?.click();
        this.getEmployeeDetails();
      });
  }

  onEdit(data: any) {
    this.employeeObj.id = data.id;
    this.formValue.controls['firstname'].setValue(data.firstname);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['dateOfJoining'].setValue(data.dateOfJoining);
    this.formValue.controls['status'].setValue(data.status);
    this.formValue.controls['salary'].setValue(data.salary);
    this.formValue.controls['phonenumber'].setValue(data.phonenumber);
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
