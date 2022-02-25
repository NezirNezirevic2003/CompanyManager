import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public signupObj = new UserModel();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.signupObj.FullName = this.signUpForm.value.fullname;
    this.signupObj.UserName = this.signUpForm.value.username;
    this.signupObj.Password = this.signUpForm.value.password;
    this.signupObj.MobileNumber = this.signUpForm.value.mobilenumber;
    this.api.signUp(this.signupObj).subscribe((res) => {
      alert(res.message);
      this.signUpForm.reset();
      this.router.navigate(['login']);
    });
  }
}
