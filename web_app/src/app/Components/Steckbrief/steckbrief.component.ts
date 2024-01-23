import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from 'src/app/Service/data-sharing/data-service.service';
import {EmployeeModel} from "../../Model/PersonModel";
import {ApiService} from "../../Service/API/swaggerConnection";

@Component({
    selector: 'app-steckbrief',
    templateUrl: './steckbrief.component.html',
    styleUrls: ['./steckbrief.component.css'],
})
export class SteckbriefComponent implements OnInit {
    @Input() showOverlay: boolean = true;
    @ViewChild('steckbrief', {static: false}) card!: ElementRef;

    firstName!: string;
    lastName!: string;
    id!: string;
    street!: string;
    postalCode!: string;
    city!: string;
    phoneNumber!: string;
    skills!: string;

    constructor(private dataService: DataService, private apiService: ApiService) {
    }

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
        // TODO: null der ID abprüfen
        const data = {
            "lastName": this.lastName,
            "firstName": this.firstName,
            "street": this.street,
            "postcode": this.postalCode,
            "city": this.city,
            "phone": this.phoneNumber,
            "skillSet": []
        };
        console.log(data);
        this.apiService.newEmployee(false, data)
    }

    createNewEmployee() {
        return new EmployeeModel(
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
        //employee löschen
    }

    toggleOverlay() {
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
        this.skills = '';
    }
}
