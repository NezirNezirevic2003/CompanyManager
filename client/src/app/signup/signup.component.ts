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
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phonenumber: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signUp() {
    this.signupObj.firstname = this.signUpForm.value.fullname;
    this.signupObj.lastname = this.signUpForm.value.username;
    this.signupObj.username = this.signUpForm.value.username;
    this.signupObj.email = this.signUpForm.value.email;
    this.signupObj.password = this.signUpForm.value.password;
    this.signupObj.phonenumber = this.signUpForm.value.phonenumber;

    this.api.signUp(this.signupObj).subscribe((res) => {
      alert(res.message);
      this.signUpForm.reset();
      this.router.navigate(['login']);
    });
  }
}
