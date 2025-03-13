import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthRecordComponent } from './birth-record.component';

describe('BirthRecordComponent', () => {
  let component: BirthRecordComponent;
  let fixture: ComponentFixture<BirthRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
