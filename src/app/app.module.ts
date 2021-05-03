import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {DataTablesModule} from 'angular-datatables';
import {LoaderModule} from './loader/loader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminSignalsComponent} from './admin-signals/admin-signals.component';
import {UsersListComponent} from './admin-home/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminHomeComponent,
    UserDashboardComponent,
    AdminSignalsComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    LoaderModule,
    NgbModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
