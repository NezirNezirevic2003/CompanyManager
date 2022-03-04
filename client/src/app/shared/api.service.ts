import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public departmentAPIUrl: string = 'https://localhost:44319/api/Department/';
  public loginAPIUrl: string = 'http://localhost:3000/api/';
  public employeeAPIUrl: string = 'http://localhost:3000/api/';
  constructor(private _http: HttpClient) {}

  GetDepartments() {
    return this._http
      .get<any>(`${this.departmentAPIUrl}get_all_departments`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  PostDepartment(data: any) {
    return this._http
      .post<any>(`${this.departmentAPIUrl}add_department`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  UpdateDepartment(data: any) {
    return this._http
      .put<any>(`${this.departmentAPIUrl}update_department`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  DeleteDepartment(id: number) {
    return this._http
      .delete<any>(`${this.departmentAPIUrl}delete_department/` + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  PostEmployee(data: any) {
    return this._http
      .post<any>(`${this.employeeAPIUrl}employee_post`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  DeleteEmployee(id: number) {
    return this._http
      .delete<any>(`${this.employeeAPIUrl}delete_employee/` + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  UpdateEmployee(data: any) {
    return this._http
      .put<any>(`${this.employeeAPIUrl}update_employee`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  GetEmployees() {
    return this._http.get<any>(`${this.employeeAPIUrl}employees`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  signUp(empObj: any) {
    return this._http.post<any>(`${this.loginAPIUrl}signup`, empObj);
  }
  login(empObj: any) {
    return this._http.post<any>(`${this.loginAPIUrl}login`, empObj);
  }
}
