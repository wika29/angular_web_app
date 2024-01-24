import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { MiniCard } from 'src/app/Components/mini-card/mini-card.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Components/PopUp/pop-up/pop-up.component';

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
  private skillsSubject = new BehaviorSubject<any[]>([]);

  constructor(private dialog: MatDialog){}

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

  public updateSingleCard(updatedCard: MiniCard): void {
    let cardData = this.miniCardSubject.value;
    const index = cardData.findIndex(card => card.employeeModel.id === updatedCard.employeeModel.id);
  
    if (index !== -1) {
      // Card found, update it
      cardData[index] = updatedCard;
      this.updateCards(cardData);
    } else {
      // Card not found, you can handle this case based on your requirements
      console.error(`Card with id ${updatedCard.employeeModel.id} not found`);
    }
  }

  public addCard(title: string, backgroundImage: string, employee: EmployeeModel): void {
    this.updateSteckbrief(employee)
    let cardData = this.miniCardSubject.value
    const newCard: MiniCard = { title, backgroundImage, employeeModel: employee};
    cardData.push(newCard);
    this.updateCards(cardData)  }

  public removeCard(employeeModel: EmployeeModel): void {
    let cardData = this.miniCardSubject.value
    cardData = cardData.filter(card => card.employeeModel !== employeeModel); 
    this.updateCards(cardData)  
  }

  public getCardById(id: string): MiniCard | undefined {
    const cardData = this.miniCardSubject.value;
    return cardData.find(card => card.employeeModel.id === id);
  }
  
  public getCardByName(name: string): MiniCard | undefined {
    const cardData = this.miniCardSubject.value;
    return cardData.find(card => card.title === name);
  }
  

  openPopup(message: string): void {
    this.dialog.open(PopupComponent, {
      data: { message },
    });
  }


}
