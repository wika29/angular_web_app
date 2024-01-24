import { Component, Input, ElementRef, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { DataService } from 'src/app/Service/data-sharing/data-service.service';
import {EmployeeModel} from "../../Model/PersonModel";
import {ApiService} from "../../Service/API/swaggerConnection";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../PopUp/pop-up/pop-up.component';
import { ImageCaptureService } from 'src/app/Service/html2Image/image-capture.service';

@Component({
  selector: 'app-steckbrief',
  templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css'],
  template: '<mat-card-content #steckbrief></mat-card-content>',
})
export class SteckbriefComponent implements OnInit, AfterViewInit {
  @Input() showOverlay: boolean = true;
  @ViewChild('steckbrief', {static:false}) card!: ElementRef;  

  lastName!: string;
  firstName!: string;
  id!: string;
  street!: string;
  postcode!: string;
  city!: string;
  phone!: string;
  skills!: any[];

  constructor(private dataService: DataService, private apiService: ApiService, private capture: ImageCaptureService) {}
  
  ngOnInit(): void {
    this.dataService.lastName$.subscribe((value) => (this.lastName = value));
    this.dataService.firstName$.subscribe((value) => (this.firstName = value));
    this.dataService.id$.subscribe((value) => (this.id = value));
    this.dataService.street$.subscribe((value) => (this.street = value));
    this.dataService.postcode$.subscribe((value) => (this.postcode = value));
    this.dataService.city$.subscribe((value) => (this.city = value));
    this.dataService.phone$.subscribe((value) => (this.phone = value));
    this.dataService.skills$.subscribe((value) => (this.skills = value));
    this.dataService.getBigCardVisibility().subscribe((value) => (this.showOverlay = value));
  }

  ngAfterViewInit(): void {
    this.dataService.cardRef = this.card;
    // this.dataService.getCardRef().subscribe((value)=> (this.card = value))
  }
  
  onSavePress() {     
    if(this.id != ""){
      let miniCard = this.dataService.getCardById(this.id)
      let employee = miniCard?.employeeModel
      if(miniCard && employee) {
        console.log("updating employee")
        this.apiService.updateEmployee(false, employee.id, employee.requestData).then(response => {          
          if(response.status == 200){
            this.dataService.openPopup("Benutzer wurde akutalisiert.")
            this.toggleOverlay()     
          }else{
            this.dataService.openPopup("Benutzer konnte nicht aktualisiert werden: " + JSON.stringify(response.status))
          }
        })
        .catch(error => {
          console.error('Error updating employee:', error);
        });
        this.toggleOverlay()
      }
      else {
        console.error("Couldn't get employee model for PUT request!")
      }
    }
    else {
      const employee = this.createNewEmployee()
      if(employee){
        console.log("create new employee")
        this.capture.capture(this.card).then((image) => {
          this.apiService.newEmployee(false, employee.requestData).then((response) => {
            console.log("Response create:", response);
            if(response.status === 200 || response.status === 201){
              this.dataService.addCard("",image,employee);
              this.dataService.openPopup("Neuen benutzer hinzugefügt. ")
            }else{
              this.dataService.openPopup("Benutzer konnte nicht hinzugefügt werden: " + JSON.stringify(response.status))
            }
          }).catch(error => {
            console.error("Error creating employee:", error);
            this.dataService.openPopup("Fehler beim hinzugfügen des Benutzers.");
          });
        }).catch(error => {
          console.error("Error creating employee image:", error);
          this.dataService.openPopup("Fehler beim hinzugfügen des Bildes für die Benutzerkarte.");
        });
      }
    };
  }

    createNewEmployee() {
        return new EmployeeModel(
            this.id,
            this.lastName,
            this.firstName,
            this.street,
            this.postcode,
            this.city,
            this.phone,
            this.skills
        );
    }

    onDeletePress() {
      const employee = this.dataService.getCardById(this.id)?.employeeModel;    
      if (employee) {
        console.log("to be deleted employee", employee)
        this.apiService.deleteEmployeeByID(false, employee.id)
          .then(response => {           
            console.log("Response delete:", response);
            if (response.status === 200 || response.status === 204) {
              // this.dataService.openPopup("Benutzer gelöscht." + JSON.stringify(response.status));
              this.dataService.removeCard(employee);
              this.toggleOverlay();
            } else {
              this.dataService.openPopup("Benutzer konnte nicht gelöscht werden! Status: " + JSON.stringify(response.status));
            }
          })
          .catch(error => {
            console.error("Error deleting employee:", error);
            this.dataService.openPopup("Fehler beim Löschen des Benutzers." +  error);
          });
      }
    }

  toggleOverlay(){
    this.dataService.setBigCardVisibility(!this.showOverlay)
  }

  resetFields(): void {
    this.lastName = '';
    this.firstName = '';
    this.id = '';
    this.street = '';
    this.postcode = '';
    this.city = '';
    this.phone = '';
    this.skills = [];
  } 
 
}