import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChartsExampleComponent } from './all-charts-example.component';

describe('AllChartsExampleComponent', () => {
  let component: AllChartsExampleComponent;
  let fixture: ComponentFixture<AllChartsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllChartsExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllChartsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
