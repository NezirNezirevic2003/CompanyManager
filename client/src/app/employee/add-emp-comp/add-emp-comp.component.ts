import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-emp-comp',
  templateUrl: './add-emp-comp.component.html',
  styleUrls: ['./add-emp-comp.component.css'],
})
export class AddEmpCompComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeeList: any = [];

  @Input() emp: any;
  EmployeeId: string;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  PhotoFileName: string;
  PhotoFilePath: string;
  ActivateAddEmpComp: boolean = false;

  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: '',
    };
    this.ActivateAddEmpComp = true;
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  // updateEmployee() {
  //   var val = {
  //     EmployeeId: this.EmployeeId,
  //     EmployeeName: this.EmployeeName,
  //     Department: this.Department,
  //     DateOfJoining: this.DateOfJoining,
  //     PhotoFileName: this.PhotoFileName,
  //   };

  //   this.service.updateEmployee(val).subscribe((res) => {
  //     alert(res.toString());
  //   });
  // }

  uploadPhoto(event): void {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  refreshEmpList(): void {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    });
  }
}
