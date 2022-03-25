import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ModalService } from '../_modal';
import { ProjectModel } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  formValue!: FormGroup;
  projectData: any = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  projectObj: ProjectModel = new ProjectModel();
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      tag: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
      employees: ['', Validators.required],
    });
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.api.GetProjects().subscribe((res) => {
      this.projectData = res.data;
    });
  }

  postProject() {
    this.projectObj.name = this.formValue.value.name;
    this.projectObj.description = this.formValue.value.description;
    this.projectObj.tag = this.formValue.value.tag;
    this.projectObj.status = this.formValue.value.status;
    this.projectObj.employees = this.formValue.value.employees;
    this.api.PostProject(this.projectObj).subscribe((res) => {
      var showAddSuccess = document.getElementById('success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
      this.getProjectDetails();
    });
  }

  onEdit(data: any) {
    this.projectObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['description'].setValue(data.description);
    this.formValue.controls['tag'].setValue(data.tag);
    this.formValue.controls['status'].setValue(data.status);
    this.formValue.controls['employees'].setValue(data.employees);
    this.showUpdate = true;
    this.showAdd = false;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  clickAddProject() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
