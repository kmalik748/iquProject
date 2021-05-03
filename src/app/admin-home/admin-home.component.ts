import { Component, OnInit } from '@angular/core';
import {UserDetails} from '../apiOutput.interface';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  userDetails: UserDetails = {} as UserDetails;
  activeUsers = 0;
  blockedUsers = 0;
  signals = 0;

  constructor(private api: ApiService) {
    console.log('Account Status: ', this.accountStatus);
    this.updateActiveBlockUsers();
  }

  ngOnInit(): void {
    this.userDetails = this.api.getDetails();
  }

  updateActiveBlockUsers(): void{
    this.api.activeBlockedUsers().subscribe(
      data => {
        this.activeUsers = data.Data.activeUsers;
        this.blockedUsers = data.Data.blockedUsers;
        this.signals = data.Data.signals;
      }
    );
  }

  get name(): string{
    return this.userDetails.name;
  }
  get accountStatus(): string{
    return this.userDetails.accountStatus ? 'Payment Verified' : 'Recharge Required';
  }

}
