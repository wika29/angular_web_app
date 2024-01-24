import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './pop-up.component';

describe('PopUpComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent]
    });
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
