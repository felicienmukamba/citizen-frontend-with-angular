import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalRecordComponent } from './criminal-record.component';

describe('CriminalRecordComponent', () => {
  let component: CriminalRecordComponent;
  let fixture: ComponentFixture<CriminalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriminalRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriminalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
