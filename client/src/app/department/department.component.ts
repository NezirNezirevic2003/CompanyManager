import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';
import { DepartmentModel } from './department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  formValue!: FormGroup;
  departmentData: any = [];
  departmentObj: DepartmentModel = new DepartmentModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  row: any = [];
  constructor(
    private api: ApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      departmentName: [''],
    });
    this.getDepartmentDetails();
  }

  clickAddDepartment() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(row: any) {
    this.departmentObj.Id = row.id;
    this.formValue.controls['departmentName'].setValue(row.departmentName);
    this.showUpdate = true;
    this.showAdd = false;
  }

  postDepartmentDetails() {
    this.departmentObj.DepartmentName = this.formValue.value.departmentName;
    this.api.PostDepartment(this.departmentObj).subscribe((res) => {
      console.log(res);
      let ref = document.getElementById('closeButton');
      ref?.click();
      this.getDepartmentDetails();
    });
  }

  editDepartmentDetail() {
    this.departmentObj.DepartmentName = this.formValue.value.departmentName;
    this.api.UpdateDepartment(this.departmentObj).subscribe((res) => {
      let ref = document.getElementById('closeButton');
      ref?.click();
      this.getDepartmentDetails();
    });
  }

  deleteDepartmentDetail(row: any) {
    this.api.DeleteDepartment(this.departmentObj.Id).subscribe((res) => {
      let ref = document.getElementById('deleteDepartmentButton');
      ref?.click();
      this.getDepartmentDetails();
    });
  }

  onDelete(row: any) {
    this.departmentObj.Id = row.id;
  }

  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.departmentDetails;
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
