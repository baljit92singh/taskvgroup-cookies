import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  signupForm = this.formBuilder.group({
    email: ['', Validators.email],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  }, { validator: this.checkPasswords });
  constructor(private formBuilder: FormBuilder,
    private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
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
