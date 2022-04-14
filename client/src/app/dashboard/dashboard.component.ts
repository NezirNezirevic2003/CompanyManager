import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private api: ApiService) {}

  // Alle types van deze component omdat die gedefinieerd moeten worden van typescript
  employeeData: any = [];
  departmentData: any = [];
  projectData: any = [];
  username: any = [];

  // Alle gegevens worden op de eerste load geladen
  ngOnInit(): void {
    this.getEmployeeDetails();
    this.getDepartmentDetails();
    this.getProjectDetails();
    this.username = localStorage.getItem('username');
  }

  // Alle gegevens worden geladen vanuit de Api
  getEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.data.length;
    });
  }

  // Alle gegevens worden geladen vanuit de Api
  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.data.length;
    });
  }

  // Alle gegevens worden geladen vanuit de Api
  getProjectDetails() {
    this.api.GetProjects().subscribe((res) => {
      this.projectData = res.data.length;
    });
  }
}
