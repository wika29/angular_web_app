import { Component, Input, ElementRef, ViewChild, OnInit} from '@angular/core';
import { DataService } from 'src/app/Service/API/data-service.service';


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
  skills!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.firstName$.subscribe((value) => (this.firstName = value));
    this.dataService.lastName$.subscribe((value) => (this.lastName = value));
    this.dataService.id$.subscribe((value) => (this.id = value));
    this.dataService.street$.subscribe((value) => (this.street = value));
    this.dataService.postalCode$.subscribe((value) => (this.postalCode = value));
    this.dataService.city$.subscribe((value) => (this.city = value));
    this.dataService.phoneNumber$.subscribe((value) => (this.phoneNumber = value));
    this.dataService.skills$.subscribe((value) => (this.skills = value));
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