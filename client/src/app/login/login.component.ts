import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowDepartmentComponent } from '../department/show-department/show-department.component';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginObj = new UserModel();
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    localStorage.clear();
  }
  login() {
    this.loginObj.UserName = this.loginForm.value.username;
    this.loginObj.Password = this.loginForm.value.password;
    this.api.login(this.loginObj).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['department']);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userType', res.userType);
      },
      (err) => {
        alert('soomething went wrong');
      }
    );
  }
}
