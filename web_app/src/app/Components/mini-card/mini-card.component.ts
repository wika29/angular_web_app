import { Component, Input, OnInit,OnDestroy  } from '@angular/core';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { DataService } from 'src/app/Service/data-sharing/data-service.service';
import { BehaviorSubject } from 'rxjs';

export interface MiniCard {
  title: string;
  backgroundImage: string;
  employeeModel: EmployeeModel
}

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css'],
  // template: `<mat-card class="custom-card"></mat-card>`,
})
export class MiniCardComponent implements OnInit, OnDestroy  {
  cardData$ = new BehaviorSubject<any[]>([]);
  miniCardData$ = this.dataService.miniCardData$;
  sharedData: any;
  showOverlay: boolean = true;  

  constructor(private dataService: DataService) {}  
  
  ngOnInit(): void {
    this.dataService.getBigCardVisibility().subscribe((value) => (this.showOverlay = value));
    this.miniCardData$.subscribe((cards: MiniCard[]) => {
      this.cardData$.next(cards);
    });
  }  

  cardClicked(card: any): void {
      if(this.showOverlay == true){
        const miniCard = card as MiniCard;
        this.dataService.updateData(miniCard.employeeModel)
        console.log('Clicked Card Data:', miniCard.employeeModel.firstName);
        this.dataService.setBigCardVisibility(!this.showOverlay)   
     }
  }

  ngOnDestroy() {
    // this.numberOfCardsSubscription.unsubscribe();
  }

}
