import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from 'src/app/Service/data-sharing/data-service.service';
import {EmployeeModel} from "../../Model/PersonModel";
import {ApiService} from "../../Service/API/swaggerConnection";
import { ImageCaptureService } from 'src/app/Service/html2Image/image-capture.service';
import { FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors, AbstractControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-steckbrief',
  templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css'],
})
export class SteckbriefComponent implements OnInit, AfterViewInit {
  @Input() showOverlay: boolean = true;
  @Input() showDelete: boolean = true;
  @ViewChild('steckbrief', {static: false}) card!: ElementRef;

  lastName!: string;
  firstName!: string;
  id!: string;
  street!: string;
  postcode!: string;
  city!: string;
  phone!: string;
  skills!: any[];

  steckBriefForm!: FormGroup

  constructor(private dataService: DataService, private apiService: ApiService, private capture: ImageCaptureService, private fb: FormBuilder) {
    this.steckBriefForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      id: [{ value: '', disabled: true },Validators.pattern(/^\d+$/)],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,}(\s*\d{1,}){0,}$/)]],
    });
  }
  
  ngOnInit(): void {
    this.dataService.lastName$.subscribe((value) => {this.lastName = value; this.steckBriefForm.get('lastName')?.setValue(value);});
    this.dataService.firstName$.subscribe((value) => {this.firstName = value;this.steckBriefForm.get('firstName')?.setValue(value);});
    this.dataService.id$.subscribe((value) => {this.id = value;this.steckBriefForm.get('id')?.setValue(value);});
    this.dataService.street$.subscribe((value) =>{this.street = value;this.steckBriefForm.get('street')?.setValue(value);});
    this.dataService.postcode$.subscribe((value) => {this.postcode = value;this.steckBriefForm.get('postcode')?.setValue(value);});
    this.dataService.city$.subscribe((value) => {this.city = value;this.steckBriefForm.get('city')?.setValue(value);});
    this.dataService.phone$.subscribe((value) => {this.phone = value;this.steckBriefForm.get('phone')?.setValue(value);});
    this.dataService.skills$.subscribe((value) => {this.skills = value;this.steckBriefForm.get('skills')?.setValue(value);});
    this.dataService.getBigCardVisibility().subscribe((value) => {this.showOverlay = value;});
    this.dataService.getDeleteVisibility().subscribe((value) => {this.showDelete = value; console.log("triggered delete visibility: ", value)});
  } 

  ngAfterViewInit(): void {
    this.dataService.cardRef = this.card;
    // this.dataService.getCardRef().subscribe((value)=> (this.card = value))
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
  
  onSavePress() {  
    if (this.steckBriefForm.valid){   
      if(this.id != ""){
        this.dataService.setBigCardVisibility(true)
        let miniCard = this.dataService.getCardById(this.id)
        let employee = miniCard?.employeeModel
        if(miniCard && employee) {
          employee.updateEmployee(
                    this.steckBriefForm.get('lastName')?.value,
                    this.steckBriefForm.get('firstName')?.value,
                    this.steckBriefForm.get('street')?.value,
                    this.steckBriefForm.get('postcode')?.value,
                    this.steckBriefForm.get('city')?.value,
                    this.steckBriefForm.get('phone')?.value,
                    this.steckBriefForm.get('skills')?.value,)
          this.apiService.updateEmployee(false, employee.id, employee.requestData).then(response => {       
            console.log("respons.status update", response.data)   
            if(response.status == 200 && employee){
              employee.id = response.data.id
                 
              this.dataService.openPopup("Benutzer wurde akutalisiert.")
            }else{
              this.dataService.openPopup("Benutzer konnte nicht aktualisiert werden: " + JSON.stringify(response.status))
            }
          })
          .catch(error => {
            console.error('Error updating employee:', error);
          });         
        }
        else {
          console.error("Couldn't get employee model for PUT request!")
        }
      }
      else {
        this.dataService.setBigCardVisibility(true)
        const employee = this.createNewEmployee()
        // console.log("create new employee: " + employee.toString())
        if(employee){
          // console.log("create new employee")
          this.capture.capture(this.card).then((image) => {
            this.apiService.newEmployee(false, employee.requestData).then((response) => {
              // console.log("Response create:", response);
              if(response.status === 200 || response.status === 201){
                console.log("Response create headers:", response.data.id);
                employee.id = response.data.id
                this.dataService.addCard("",image,employee);
                this.dataService.openPopup("Neuen benutzer hinzugefügt.")
              }else{
                this.dataService.openPopup("Benutzer konnte nicht hinzugefügt werden: " + JSON.stringify(response.status) + JSON.stringify(response.headers))
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
    } else {
      // Display error messages or take other actions based on form control validity
      console.log('Please correct the following issues:');
      for (const controlName in this.steckBriefForm.controls) {
        const control = this.steckBriefForm.get(controlName);
        if (control?.invalid && control.touched) {
          console.log(this.getErrorMessage(controlName));
        }
      }
    }
  }
 
  getErrorMessage(controlName: string): string {
    const control = this.steckBriefForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required.`;
    } else if (control?.hasError('pattern')) {
      return `Invalid ${controlName}. Please enter a valid value.`;
      // Add more conditions for other error types as needed
    }

    // Default message
    return `Invalid ${controlName}.`;
  }


  createNewEmployee() { 
      return new EmployeeModel(
          '0',
          this.steckBriefForm.get('lastName')?.value,
          this.steckBriefForm.get('firstName')?.value,
          this.steckBriefForm.get('street')?.value,
          this.steckBriefForm.get('postcode')?.value,
          this.steckBriefForm.get('city')?.value,
          this.steckBriefForm.get('phone')?.value,
          this.steckBriefForm.get('skills')?.value,
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

    this.steckBriefForm.get('lastName')?.setValue('');
    this.steckBriefForm.get('firstName')?.setValue('');
    this.steckBriefForm.get('id')?.setValue('');
    this.steckBriefForm.get('street')?.setValue('');
    this.steckBriefForm.get('postcode')?.setValue('');
    this.steckBriefForm.get('city')?.setValue('');
    this.steckBriefForm.get('phone')?.setValue('');
    this.steckBriefForm.get('skills')?.setValue('');
  } 

  onTestButtonClick(){
    Object.keys(this.steckBriefForm.controls).forEach(controlName => {
      const control = this.steckBriefForm.get(controlName);
      console.log(`Control: ${controlName}, Valid: ${control?.valid}, Errors: ${JSON.stringify(control?.errors)}`);
    });
  }
 
}
