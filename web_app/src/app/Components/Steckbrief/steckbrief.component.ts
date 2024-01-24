import { Component, Input, ElementRef, ViewChild, OnInit} from '@angular/core';
import { DataService } from 'src/app/Service/data-sharing/data-service.service';
import {EmployeeModel} from "../../Model/PersonModel";
import {ApiService} from "../../Service/API/swaggerConnection";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../PopUp/pop-up/pop-up.component';

@Component({
  selector: 'app-steckbrief',
  templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css'],
  template: '<mat-card-content #steckbrief></mat-card-content>',
})
export class SteckbriefComponent implements OnInit {
  @Input() showOverlay: boolean = true;
  @ViewChild('steckbrief', {static:false}) card!: ElementRef ;   

  firstName!: string;
  lastName!: string;
  id!: string;
  street!: string;
  postalCode!: string;
  city!: string;
  phoneNumber!: string;
  skills!: any[];

  constructor(private dataService: DataService, private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.firstName$.subscribe((value) => (this.firstName = value));
    this.dataService.lastName$.subscribe((value) => (this.lastName = value));
    this.dataService.id$.subscribe((value) => (this.id = value));
    this.dataService.street$.subscribe((value) => (this.street = value));
    this.dataService.postalCode$.subscribe((value) => (this.postalCode = value));
    this.dataService.city$.subscribe((value) => (this.city = value));
    this.dataService.phoneNumber$.subscribe((value) => (this.phoneNumber = value));
    this.dataService.skills$.subscribe((value) => (this.skills = value));
    this.dataService.getBigCardVisibility().subscribe((value) => (this.showOverlay = value));
  }

  onSavePress() {     
    if(this.id != ""){
      let miniCard = this.dataService.getCardById(this.id)
      let employee = miniCard?.employeeModel
      if(miniCard && employee) {
        console.log("updating employee")
        this.apiService.updateEmployee(false, employee.id, employee.requestData).then(response => {
          this.dataService.openPopup(JSON.stringify(response.status))
          if(response.status == 200)
            this.dataService.openPopup("Benutzer wurde akutalisiert. Status: ")
          else{
            this.dataService.openPopup("Benutzer konnte nicht aktualisiert werden: " + JSON.stringify(response.status))
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
        this.toggleOverlay()
      }
      else{
        console.error("Couldn't get employee model for PUT request!")
      }
    }
    else {
      let employee = this.createNewEmployee()
      if(employee){
        console.log("create new employee")
        this.dataService.addCard("","",employee)
        this.apiService.newEmployee(false, employee.requestData).then(response =>{
          if(response.status == 200)
            this.dataService.openPopup("Neuen benutzer hinzugefügt. ")
          else{
            this.dataService.openPopup("Benutzer konnte nicht hinzugefügt werden: " + JSON.stringify(response.status))
          }
        })};
        this.toggleOverlay();
      };
    }

    createNewEmployee() {
        return new EmployeeModel(
            this.id,
            this.lastName,
            this.firstName,
            this.street,
            this.postalCode,
            this.city,
            this.phoneNumber,
            this.skills
        );
    }

    onDeletePress() {
      let employee = this.dataService.getCardById(this.id)?.employeeModel
      if(employee){
        this.apiService.deleteEmployeeByID(false, employee.id).then(response =>{
          if(response.status == 200)
            this.dataService.openPopup("Benutzer gelöscht." + JSON.stringify(response.status))
          else{
            this.dataService.openPopup("Benutzer konnte nicht gelöscht werden! Status: " + JSON.stringify(response.status))
          }
          })
          this.dataService.removeCard(employee)
          this.toggleOverlay()
        }
    }

  toggleOverlay(){
    this.dataService.setBigCardVisibility(!this.showOverlay)
  }

  resetFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.id = '';
    this.street = '';
    this.postalCode = '';
    this.city = '';
    this.phoneNumber = '';
    this.skills = [];
  } 
 
}