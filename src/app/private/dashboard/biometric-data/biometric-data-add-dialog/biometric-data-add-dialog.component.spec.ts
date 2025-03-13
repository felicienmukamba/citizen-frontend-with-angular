import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricDataAddDialogComponent } from './biometric-data-add-dialog.component';

describe('BiometricDataAddDialogComponent', () => {
  let component: BiometricDataAddDialogComponent;
  let fixture: ComponentFixture<BiometricDataAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiometricDataAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiometricDataAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
