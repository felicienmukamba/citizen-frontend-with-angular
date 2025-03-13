import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathRecordComponent } from './death-record.component';

describe('DeathRecordComponent', () => {
  let component: DeathRecordComponent;
  let fixture: ComponentFixture<DeathRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
