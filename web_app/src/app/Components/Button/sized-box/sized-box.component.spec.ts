import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SizedBoxComponent} from './sized-box.component';

describe('SizedBoxComponent', () => {
  let component: SizedBoxComponent;
  let fixture: ComponentFixture<SizedBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizedBoxComponent]
    });
    fixture = TestBed.createComponent(SizedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
