import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminHomeComponent} from '../admin-home.component';
import {allUsersApiModel, allUsersList, paymentApiModal} from '../../apiOutput.interface';
import {ApiService} from '../../api.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  users: allUsersList | any = {};
  loadingUsers = true;
  @ViewChild('content', {static: false}) modal: any;
  selectedUser = 0;
  paymentModal: any;

  constructor(private http: HttpClient, private api: ApiService,
              private modalService: NgbModal,
              private dashboard: AdminHomeComponent) {
    this.getAllUsersList();
  }

  firePaymentModal(id: number): void {
    this.selectedUser = id;
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updatePayment(): void{
    this.api.updatePayment(this.api.userID, this.selectedUser).subscribe(
      value => {
        value = value as paymentApiModal;
        if (!value.Error){
          this.modalService.dismissAll(); // Close Modal
          this.getAllUsersList(); // Refreshing Users
          this.dashboard.updateActiveBlockUsers();
        }
      }
    );
  }

  getAllUsersList(): void{
    this.loadingUsers = true;
    this.http.post< allUsersApiModel >(
      environment.getAllUsers,
      {id: this.api.userID}
    ).subscribe(
      Data => {
        Data = Data as allUsersApiModel;
        if (!Data.Error){
          this.loadingUsers = false;
          this.users = Data.Data;
          console.log(this.users);
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
}
