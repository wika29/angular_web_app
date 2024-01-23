import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { MiniCard } from 'src/app/Components/mini-card/mini-card.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firstNameSubject = new BehaviorSubject<string>('');
  private lastNameSubject = new BehaviorSubject<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private streetSubject = new BehaviorSubject<string>('');
  private postalCodeSubject = new BehaviorSubject<string>('');
  private citySubject = new BehaviorSubject<string>('');
  private phoneNumberSubject = new BehaviorSubject<string>('');
  private skillsSubject = new BehaviorSubject<string>('');

  firstName$ = this.firstNameSubject.asObservable();
  lastName$ = this.lastNameSubject.asObservable();
  id$ = this.idSubject.asObservable();
  street$ = this.streetSubject.asObservable();
  postalCode$ = this.postalCodeSubject.asObservable();
  city$ = this.citySubject.asObservable();
  phoneNumber$ = this.phoneNumberSubject.asObservable();
  skills$ = this.skillsSubject.asObservable();

  updateData(data: any): void {
    this.firstNameSubject.next(data.firstName);
    this.lastNameSubject.next(data.lastName);
    this.idSubject.next(data.id);
    this.streetSubject.next(data.street);
    this.postalCodeSubject.next(data.postalCode);
    this.citySubject.next(data.city);
    this.phoneNumberSubject.next(data.phoneNumber);
    this.skillsSubject.next(data.skills);
  }

  updateSteckbrief(employee : EmployeeModel): void {
    console.log("update employee: ", employee.toString())
    return this.updateData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      id: employee.id,
      street: employee.street,
      postalCode: employee.postcode,
      city: employee.city,
      phoneNumber: employee.phone,
      // skills: employee.skillSet,
    });  
  }

  private cardVisibility = new BehaviorSubject<boolean>(true);
  getBigCardVisibility(): Observable<boolean> {
    return this.cardVisibility.asObservable();
  }

  setBigCardVisibility(value: boolean): void {
    this.cardVisibility.next(value);
  }

  private miniCardSubject = new BehaviorSubject<MiniCard[]>([]);
  miniCardData$ = this.miniCardSubject.asObservable();
  updateCards(newCardData: MiniCard[]) {
    this.miniCardSubject.next(newCardData);
  }

  public addCard(cardData: MiniCard[], title: string, backgroundImage: string, employeeModel: EmployeeModel): void {
    const newCard: MiniCard = { title, backgroundImage, employeeModel};
    cardData.push(newCard);
    this.updateCards(cardData)
  }

  public removeCard(cardData: MiniCard[],employeeModel: EmployeeModel): void {
    cardData = cardData.filter(card => card.employeeModel !== employeeModel); 
    this.updateCards(cardData)  
  }


  


}
