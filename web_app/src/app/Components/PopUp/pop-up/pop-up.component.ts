import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
    <h2>{{ data.status }}</h2>
    <p>{{ data.message }}</p>
    <mat-dialog-actions>
      <button mat-button (click)="onOkClick()">OK</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopUpComponent>
  ) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
