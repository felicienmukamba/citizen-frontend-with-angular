import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from '../../../../services/person.service';
import { Person } from '../../../../models/Person.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-biometric-data-add-dialog',
  templateUrl: './biometric-data-add-dialog.component.html',
  styleUrls: ['./biometric-data-add-dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class BiometricDataAddDialogComponent {
  addForm: FormGroup;
  filteredPersons: Person[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    public dialogRef: MatDialogRef<BiometricDataAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addForm = this.fb.group({
      personId: [null, Validators.required],
      facialRecognitionImages: ['', Validators.required],
      fingerprints: ['', Validators.required],
      leftEyeScan: ['', Validators.required],
      rightEyeScan: ['', Validators.required],
    });
  }

  onNationalityIDInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value?.length >= 3) {
      this.isLoading = true;
      this.personService.getPersonByNationalityID(value).subscribe(
        (persons) => {
          this.filteredPersons.push(persons);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching persons:', error);
          this.filteredPersons = [];
          this.isLoading = false;
        }
      );
    } else {
      this.filteredPersons = [];
    }
  }

  displayPerson(person: Person): string {
    return person ? `${person.firstName} ${person.lastName} (${person.nationalityID})` : '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const formValue = this.addForm.value;

      if (formValue.personId && typeof formValue.personId === 'object') {
        formValue.personId = formValue.personId.id;
      }

      this.dialogRef.close(formValue);
    }
  }
}
