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
  addModal: boolean = true;
  deleteConfirmModal: boolean = true;
  modalBtn() {
    this.addModal = !this.addModal;
  }
  deleteBtn() {
    this.deleteConfirmModal = !this.deleteConfirmModal;
  }
  dropDownList: any;
  // Alle types van de Project component opnoemen
  formValue!: FormGroup;
  projectData: any = [];
  name: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  projectObj: ProjectModel = new ProjectModel();
  data: any = [];

  // Een constructor benoemen met hun private parameters
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  // Alle projecten worden geladen met de eerste pageload
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

  // Alle gegevens uit de database halen
  getProjectDetails() {
    this.api.GetProjects().subscribe((res) => {
      this.projectData = res.data;
    });
  }

  // Project wordt verzonden naar de database met alle
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

  // project bewerken en selecteren
  editProjectDetail(id: any) {
    this.projectObj.name = this.formValue.value.name;
    this.projectObj.description = this.formValue.value.description;
    this.projectObj.tag = this.formValue.value.tag;
    this.projectObj.status = this.formValue.value.status;
    this.projectObj.employees = this.formValue.value.employees;
    this.api
      .UpdateProject(this.projectObj, this.projectObj.id)
      .subscribe((res) => {
        this.getProjectDetails();
      });
  }

  // Specifieke rij van de project selecteren
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

  // De verwijderfunctie die alle gegevens van het project verwijdert
  deleteProjectDetail(data: any) {
    this.api.DeleteProject(this.projectObj.id).subscribe((res) => {
      let ref = document.getElementById('deleteProjectButton');
      ref?.click();
      this.getProjectDetails();
    });
  }

  // Deze functie zorgt ervoor dat de project id geselecteerd wordt
  onDelete(data: any) {
    this.projectObj.id = data.id;
  }

  // Fuctie om de modal open te doen
  openModal(id: string) {
    this.modalService.open(id);
  }

  // Modal sluiten
  closeModal(id: string) {
    this.modalService.close(id);
  }

  // Project toevoegen
  clickAddProject() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // Zoekfunctie die projectnamen doorzoekt
  Search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.projectData = this.projectData.filter((res: { name: any }) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }
}
