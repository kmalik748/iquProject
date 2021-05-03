import { Component } from '@angular/core';
import {paymentApiModal, SignalsApiFull, signalsType} from '../apiOutput.interface';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-signals',
  templateUrl: './admin-signals.component.html',
  styleUrls: ['./admin-signals.component.css']
})
export class AdminSignalsComponent {

  signalForm: FormGroup;
  signals: signalsType | any = {};
  loading  = false;
  formSubmitted = false;

  constructor(private http: HttpClient,
              private api: ApiService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this.getAllSignals();
    this.signalForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      size: ['', [Validators.required]],
      openPrice: ['', [Validators.required]],
      closePrice: ['', [Validators.required]]
    });
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

  closeSignal(id: number): void{
    this.api.closeSignal(id).subscribe(
      Data => {
        console.log(Data);
        Data = Data as paymentApiModal;
        if (!Data.Error){
          this.getAllSignals();
        }
        else {
          console.log(Data);
        }
      },
      error => {
        console.log('ERROR in Closing Signal!\n' , error);
      }
    );
  }

  signalText(value: boolean): string{
    return value ? 'OPEN' : 'CLOSE';
  }

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    });
  }

  addNewSignal(): void{
    this.formSubmitted = true;
    if (!this.signalForm.valid){
      this.loading = false;
      return ;
    }
    this.loading = true;
    // console.log(this.loginForm.value);
    const values = this.signalForm.value;
    this.api.addNewSignal(values.name, values.type, values.size, values.openPrice, values.closePrice)
      .subscribe(
        Data => {
          if (!Data.Error){
            this.modalService.dismissAll(); // Close Modal
            this.getAllSignals();
          }
          if (Data.Error){
            this.loading = false;
          }
        },
        error => {
          console.log('Technical issue occurred while processing request!');
          this.loading = false;
        });
  }
}
