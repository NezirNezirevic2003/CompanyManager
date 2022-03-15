import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';
import { DepartmentModel } from './department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  name: any;
  formValue!: FormGroup;
  departmentData: any = [];
  departmentObj: DepartmentModel = new DepartmentModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  data: any = [];
  constructor(
    private api: ApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.getDepartmentDetails();
  }

  clickAddDepartment() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(data: any) {
    this.departmentObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['description'].setValue(data.description);
    this.showUpdate = true;
    this.showAdd = false;
  }

  postDepartmentDetails() {
    this.departmentObj.name = this.formValue.value.name;
    this.departmentObj.description = this.formValue.value.description;
    this.api.PostDepartment(this.departmentObj).subscribe((res) => {
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
      this.getDepartmentDetails();
    });
  }

  editDepartmentDetail(id: any) {
    this.departmentObj.name = this.formValue.value.name;
    this.departmentObj.description = this.formValue.value.description;
    this.api
      .UpdateDepartment(this.departmentObj, this.departmentObj.id)
      .subscribe((res) => {
        let ref = document.getElementById('closeButton');
        ref?.click();
        this.getDepartmentDetails();
      });
  }

  deleteDepartmentDetail(data: any) {
    this.api.DeleteDepartment(this.departmentObj.id).subscribe((res) => {
      let ref = document.getElementById('deleteDepartmentButton');
      ref?.click();
      this.getDepartmentDetails();
    });
  }

  onDelete(data: any) {
    this.departmentObj.id = data.id;
  }

  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.data;
      console.log(this.departmentData);
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  Search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.departmentData = this.departmentData.filter((res: { name: any }) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }
}
