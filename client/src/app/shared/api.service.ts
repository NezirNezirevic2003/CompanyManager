import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl: string = 'http://localhost:5000/api/';

  constructor(private _http: HttpClient) {}

  GetProjects() {
    return this._http.get<any>(`${this.apiUrl}projects`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  PostProject(data: any) {
    return this._http.post<any>(`${this.apiUrl}project_post`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  UpdateProject(data: any, id: any) {
    return this._http.put<any>(`${this.apiUrl}update_project/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  GetDepartments() {
    return this._http.get<any>(`${this.apiUrl}departments`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  PostDepartment(data: any) {
    return this._http.post<any>(`${this.apiUrl}post_department`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  UpdateDepartment(data: any, id: any) {
    return this._http
      .put<any>(`${this.apiUrl}update_department/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  DeleteDepartment(id: number) {
    return this._http.delete<any>(`${this.apiUrl}delete_department/` + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  PostEmployee(data: any) {
    return this._http.post<any>(`${this.apiUrl}employee_post`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  DeleteEmployee(id: number) {
    return this._http.delete<any>(`${this.apiUrl}delete_employee/` + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  UpdateEmployee(data: any, id: any) {
    return this._http
      .put<any>(`${this.apiUrl}update_employee/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  GetEmployees() {
    return this._http.get<any>(`${this.apiUrl}employees`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  signUp(empObj: any) {
    return this._http.post<any>(`${this.apiUrl}signup`, empObj);
  }

  login(empObj: any) {
    return this._http.post<any>(`${this.apiUrl}login`, empObj);
  }
}
