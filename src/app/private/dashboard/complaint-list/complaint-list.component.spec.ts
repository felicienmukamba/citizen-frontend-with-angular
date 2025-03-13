import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListComponent } from './complaint-list.component';

describe('ComplaintListComponent', () => {
  let component: ComplaintListComponent;
  let fixture: ComponentFixture<ComplaintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
