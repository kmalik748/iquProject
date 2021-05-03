import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loading = false;
  signpForm: FormGroup;
  error = '';
  formSubmitted = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) {
    this.signpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.signpForm.controls; }

  ngOnInit(): void {
  }

  redirectToLogin(): void{
    this.router.navigate(['login']);
  }

  submitSignup(): void{
    // console.log(this.f);
    this.formSubmitted = true;
    if (!this.signpForm.valid){
      this.loading = false;
      return ;
    }
    this.loading = true;
    // console.log(this.loginForm.value);
    this.api.signup(this.signpForm.value.name, this.signpForm.value.email, this.signpForm.value.password)
      .subscribe(
        Data => {
          console.log('Data from api: ' , Data);
          if (!Data.Error){
            this.api.setToken(Data.Data);
            this.error = '';
            this.router.navigate(['./login'], {queryParams: {signUp: true}});
          }
          if (Data.Error){
            this.error = 'Signup Failed';
            this.loading = false;
            if (Data.Data.msg){
              this.error = Data.Data.msg;
            }
          }
        },
        error => {
          this.error = 'Technical issue occurred while processing request!';
          this.loading = false;
          console.log(error);
        });
  }

}
