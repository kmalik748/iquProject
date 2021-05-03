import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {SignalsApiFull, signalsType, UserDetails} from '../apiOutput.interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userDetails: UserDetails = {} as UserDetails;
  isActivated = false;
  signals: signalsType | any = {};
  loading = true;

  constructor(private api: ApiService) {
    this.getAllSignals();
    this.api.getAccountStatus(this.api.userID).subscribe(
      Data => {
        Data = Data.Active;
        this.isActivated = Data;
        console.log(Data);
      }
    );
  }

  ngOnInit(): void {
    this.userDetails = this.api.getDetails();
  }

  get name(): string{
    return this.userDetails.name;
  }
  get accountStatus(): string{
    return this.isActivated ? 'Payment Verified' : 'Recharge Required';
  }

  getAllSignals(): void{
    this.loading = true;
    this.api.getAllSignals().subscribe(
      Data => {
        Data = Data as SignalsApiFull;
        if (!Data.Error){
          this.signals = Data.Data;
          console.log(this.signals);
          this.loading = false;
        }
        else {
          console.log(Data);
        }
      },
      error => {
        console.log('ERROR in Getting All Users!\n' , error);
      }
    );
  }



  signalText(value: boolean): string{
    return value ? 'OPEN' : 'CLOSE';
  }

}
