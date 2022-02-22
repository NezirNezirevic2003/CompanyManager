import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departmentData: any = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getDepartmentDetails();
  }

  getDepartmentDetails() {
    this.api.GetDepartments().subscribe((res) => {
      this.departmentData = res.departmentDetails;
    });
  }
}
