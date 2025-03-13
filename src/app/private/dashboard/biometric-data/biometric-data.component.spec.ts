import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricDataComponent } from './biometric-data.component';

describe('BiometricDataComponent', () => {
  let component: BiometricDataComponent;
  let fixture: ComponentFixture<BiometricDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiometricDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiometricDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
