import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SteckbriefComponent } from './steckbrief.component';
import { MatCardModule } from '@angular/material/card';

describe('SteckbriefComponent', () => {
  let component: SteckbriefComponent;
  let fixture: ComponentFixture<SteckbriefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SteckbriefComponent],
      imports: [MatCardModule]
    });
    fixture = TestBed.createComponent(SteckbriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
