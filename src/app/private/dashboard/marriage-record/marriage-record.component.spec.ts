import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRecordComponent } from './marriage-record.component';

describe('MarriageRecordComponent', () => {
  let component: MarriageRecordComponent;
  let fixture: ComponentFixture<MarriageRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarriageRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
