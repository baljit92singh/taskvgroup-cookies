import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.formBuilder.group({
    email: ['', Validators.email],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder,
    private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  get f() { return this.signupForm.controls; }

  signup() {
    const signupFormRequest = {
      email: this.f.email.value,
      password: this.f.password.value,
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value,
      confirm_password: this.f.confirm_password.value
    };
    this.cookies.set('email', signupFormRequest.email)
    this.cookies.set('password', signupFormRequest.password)
    this.cookies.set('first_name', signupFormRequest.first_name)
    this.cookies.set('last_name', signupFormRequest.last_name)
    this.cookies.set('confirm_password', signupFormRequest.confirm_password)
    this.router.navigate(['/dashboard'])
  }
}
