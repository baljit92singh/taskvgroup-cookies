import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });
  emailCheck = "";
  passwordCheck = "";
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private cookies: CookieService,
    private commonServie: CommonService
  ) {
    console.log(this.cookies.get('email'), this.cookies.get('password'))
    if (this.cookies.get('email') && this.cookies.get('password')) {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  login() {
    const loginRequest = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.emailCheck = this.cookies.get('email');
    this.passwordCheck = this.cookies.get('password');
    if (this.emailCheck === loginRequest.email && this.passwordCheck === loginRequest.password) {
      this.router.navigate(['/dashboard'])
    } else {
      this.commonServie.openSnackBar("Invalid User", "Dismiss")
    }
  }



}
