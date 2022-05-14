import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pass: boolean = false;
  clickEvent() {
    this.pass = !this.pass;
  }
  // Publieke types voor de Login component
  public loginForm!: FormGroup;
  public loginObj = new UserModel();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  // Op de paginalading wordt de formulier standaardwaarde vastgesteld en de localstorage schoongemaakt
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    localStorage.clear();
  }

  // Login functie die je laat inloggen
  login() {
    this.loginObj.username = this.loginForm.value.username;
    this.loginObj.password = this.loginForm.value.password;
    this.api.login(this.loginObj).subscribe(
      (res) => {
        this.router.navigate(['dashboard']);
        localStorage.setItem('username', res.username);
        localStorage.setItem('token', res.token);
        localStorage.setItem('cookie', res.cookie);
      },
      (err) => {
        this.router.navigate(['login']);
      }
    );
  }
}
