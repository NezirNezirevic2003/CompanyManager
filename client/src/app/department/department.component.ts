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
  // Alle Department types benoemen
  name: any;
  formValue!: FormGroup;
  departmentData: any = [];
  departmentObj: DepartmentModel = new DepartmentModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  data: any = [];

  // Alle constructors benoemen voor dit component
  constructor(
    private api: ApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  // Alle departments worden geladen op de pagina load en de standaard formulier waarde wordt ingesteld
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.getDepartmentDetails();
  }

  // Klikfunctie voor het toevoegen voor van de department
  clickAddDepartment() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // Klikmethode voor het selecteren vaan een rij van data
  onEdit(data: any) {
    this.departmentObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['description'].setValue(data.description);
    this.showUpdate = true;
    this.showAdd = false;
  }

  // Een post functie die alle gegevens naar de database stuurt
  postDepartmentDetails() {
    this.departmentObj.name = this.formValue.value.name;
    this.departmentObj.description = this.formValue.value.description;
    this.api.PostDepartment(this.departmentObj).subscribe((res) => {
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

  // Bijwerkfunctie die alle gegevens bijwerkt en naar de database verstuurt
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

  // Verwijderfunctie die de department verwijdert uit de database
  deleteDepartmentDetail(data: any) {
    this.api.DeleteDepartment(this.departmentObj.id).subscribe((res) => {
      let ref = document.getElementById('deleteDepartmentButton');
      ref?.click();
      this.getDepartmentDetails();
    });
  }

  // Verwijderfunctie die de rij selecteert die verwijdert gaat worden
  onDelete(data: any) {
    this.departmentObj.id = data.id;
  }

  // Alle departments uit de database verkrijgen
  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.data;
    });
  }

  // Open modal functie
  openModal(id: string) {
    this.modalService.open(id);
  }

  // Sluit de modal functie
  closeModal(id: string) {
    this.modalService.close(id);
  }

  // Zoekfunctie die alle departmentnamen filtreert
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
