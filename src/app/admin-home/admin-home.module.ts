import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: AdminHomeComponent}
  ])]
})
export class AdminHomeModule{

}
