import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private api: ApiService) {}

  employeeData: any = [];
  departmentData: any = [];
  projectData: any = [];
  username: any = [];

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.getDepartmentDetails();
    this.getProjectDetails();
    this.username = localStorage.getItem('username');
  }

  getEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.data.length;
    });
  }

  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.data.length;
    });
  }

  getProjectDetails() {
    this.api.GetProjects().subscribe((res) => {
      this.projectData = res.data.length;
    });
  }
}
