import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminSignalsComponent} from './admin-signals.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: AdminSignalsComponent}
  ])]
})
export class AdminSignalsModule{

}
