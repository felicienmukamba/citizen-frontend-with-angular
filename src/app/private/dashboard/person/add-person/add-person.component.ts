
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../../../services/person.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
})
export class AddPersonComponent implements OnInit {
  personForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private personService: PersonService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      gender: ['MALE'],
      maritalStatus: ['SINGLE'],
      spouseName: [''], // Optionnel, utilisé conditionnellement
    });

    // Validation dynamique du champ spouseName
    this.personForm.get('maritalStatus')?.valueChanges.subscribe((status) => {
      const spouseNameControl = this.personForm.get('spouseName');
      if (status === 'MARRIED') {
        spouseNameControl?.setValidators(Validators.required);
      } else {
        spouseNameControl?.clearValidators();
      }
      spouseNameControl?.updateValueAndValidity();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.personForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control?.hasError('email')) {
      return `Please enter a valid email address`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.isSubmitting = true; // Début du traitement
      this.personService.addPerson(this.personForm.value).subscribe(() => {
        alert('Person added successfully!');
        this.personForm.reset();
        this.isSubmitting = false; // Fin du traitement
      }, () => {
        this.isSubmitting = false; // En cas d'erreur
      });
    }
  }
}
