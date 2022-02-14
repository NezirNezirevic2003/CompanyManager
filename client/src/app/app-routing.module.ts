import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { AddEmpCompComponent } from './employee/add-emp-comp/add-emp-comp.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/add-employee', component: AddEmpCompComponent },
  { path: 'department', component: DepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
