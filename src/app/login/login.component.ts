import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  error = '';
  formSubmitted = false;
  signUp: string | null | boolean  = false;
  logoutValue: string | null | boolean = false;
  sessionExpire: string | null | boolean = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.logoutValue = this.route.snapshot.queryParamMap.get('logout');
    this.signUp = this.route.snapshot.queryParamMap.get('signUp');
    this.sessionExpire = this.route.snapshot.queryParamMap.get('sessionExpire');
    if (this.logoutValue || this.signUp || this.sessionExpire){
      if (this.sessionExpire) { this.error = 'Session Expired! Please Login Again'; }
      setTimeout(() => {
        this.logoutValue = false;
        this.signUp = false;
        this.error = '';
      }, 8000);
    }
  }

  get f() { return this.loginForm.controls; }

  submitLoginForm(): void{
    // console.log(this.f);
    this.formSubmitted = true;
    if (!this.loginForm.valid){
      this.loading = false;
      return ;
    }
    this.loading = true;
    // console.log(this.loginForm.value);
    this.api.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        Data => {
          if (!Data.Error){
            this.api.setToken(Data.Data);
            this.error = '';
            if (Data.Data.isAdmin){
              this.router.navigate(['/admin-dashboard']);
            }else{
              this.router.navigate(['/user-dashboard']);
            }
          }
          if (Data.Error){
            this.error = 'Incorrect email/password!';
            this.loading = false;
          }
      },
      error => {
        this.error = 'Technical issue occurred while processing request!';
        this.loading = false;
      });
  }

  redirectToSignup(): void{
    this.router.navigate(['signup']);
  }
}
