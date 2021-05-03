import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject, Subscribable} from 'rxjs';
import {apiOutputModel, SignalsApiFull} from './apiOutput.interface';
import {UserDetails} from './apiOutput.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoggedIn = false;
  isAdmin = false;
  userID = 0;
  userLoggedInSubject = new Subject<UserDetails>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Subscribable<any>{
    return this.http.post < apiOutputModel >(
        environment.LoginAPI,
        {email, password}
        );
  }

  signup(name: string, email: string, password: string): Subscribable<any>{
    return this.http.post< apiOutputModel >(
      environment.signUpAPI,
      {
        name, email, password
      }
    );
  }

  setToken(user: UserDetails): void{
    // Casting Variables form string to their DataType
    // user.id = +user.id;
    // user.accountStatus = Boolean(user.accountStatus);
    // user.isAdmin = Boolean(user.isAdmin);
    if (user.name){
      this.isLoggedIn = true;
      this.isAdmin = user.isAdmin;
      this.userID = user.id;
      console.log('userAdmin: ' + this.isAdmin);
    }
    // Emitting new User Object
    this.userLoggedInSubject.next(user);
    localStorage.setItem('userDetails', JSON.stringify(user));
    console.log('Emitted Data: ', user);
  }

  getDetails(): UserDetails {
    const appData: UserDetails | string | null = localStorage.getItem('userDetails');
    return  JSON.parse(appData as string);
  }

  updatePayment(adminID: number, userID: number): Subscribable<any>{
    return this.http.post(
      environment.updatePayment,
      {
        adminID, userID
      }
    );
  }

  activeBlockedUsers(): Subscribable<any>{
    const adminID = this.userID;
    return this.http.post(
      environment.activeBlockedUsers,
      {
        adminID
      }
    );
  }

  getAllSignals(): Subscribable<any>{
    return this.http.post< SignalsApiFull >(
      environment.allSignals,
      {id: this.userID}
    );
  }

  closeSignal(id: number): Subscribable<any>{
    return this.http.post(
      environment.closeSignal,
      {
        adminID: this.userID,
        signalID: id
      }
    );
  }

  addNewSignal(name: string, type: string, size: number, openPrice: number, closePrice: number): Subscribable<any>{
    console.log(name, type, size, openPrice, closePrice);
    return this.http.post(
      environment.addSignal,
      {
        name, type, size, openPrice, closePrice
      }
    );
  }

  getAccountStatus(id: number): Subscribable<any>{
    return this.http.post(
      environment.accountStatus,
      {
        id
      }
    );
  }
}
