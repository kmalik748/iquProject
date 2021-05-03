import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {UserDetails} from '../apiOutput.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  username: string | null = '';
  dashboardLink = '';
  userDetails: UserDetails = {accountStatus: false, email: '', id: 0, isAdmin: false, name: ''};
  isAdmin: boolean = false;

  constructor(private api: ApiService, private router: Router) {
    console.log('header here');
    if (localStorage.getItem('userDetails')){
      const appData: UserDetails | string | null = localStorage.getItem('userDetails');
      const userDetails = JSON.parse(appData as string);
      // console.log('User Name =>> ' , userDetails.name.length);
      if (userDetails.name.length > 0){
        console.log('Current Data', userDetails);
        const data: UserDetails =  userDetails;
        this.api.setToken(data);
        this.loginTrueCondition(data);
        if (userDetails.isAdmin){
          this.router.navigate(['./admin-dashboard']);
        }
        else {
          this.router.navigate(['./user-dashboard']);
        }
      }else {
        this.isLoggedIn = false;
        this.logout();
        console.log('in else');
        console.log('No users pre data found in applications storage');
      }
    }
    this.isAdmin = this.api.isAdmin;
  }

  ngOnInit(): void {
    this.api.userLoggedInSubject.subscribe( res => {
      this.userDetails = res;
      console.log('New Data Received in header ', this.userDetails);
      // If Logged In
      if (this.userDetails.name){
        this.loginTrueCondition(this.userDetails);
        this.isAdmin = this.userDetails.isAdmin;
      }
    });
  }

  loginTrueCondition(data: UserDetails): void{
    this.isLoggedIn = true;
    console.log('Here -> ' , data);
    this.username = data.name;
    if (data.isAdmin){
      this.dashboardLink = 'admin-dashboard';
    }else {
      this.dashboardLink = 'user-dashboard';
    }
  }

  logout(): void{
    // const emptyData: UserDetails = {
    //   id: 0, name: '', email: '', accountStatus: false
    // };
    const emptyData: UserDetails = {accountStatus: false, email: '', id: 0, isAdmin: false, name: ''};
    this.api.setToken(emptyData);
    this.isLoggedIn = false;
    this.router.navigate(['./login'], {queryParams: {logout: true}});
  }

}
