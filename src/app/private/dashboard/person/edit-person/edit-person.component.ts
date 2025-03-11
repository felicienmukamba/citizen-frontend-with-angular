import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Nationality, Gender, EthnicGroup, BloodType, MaritalStatus, PersonAllergies } from '../../../../models/Person.model';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressBarModule,
  ],
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  contactDetailsForm!: FormGroup;
  additionalDetailsForm!: FormGroup;
  isSubmitting = false;
  nationalityID!: string;

  private _snackBar = inject(MatSnackBar);


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Enumérations pour les champs à choix
  nationalities = Object.values(Nationality);
  genders = Object.values(Gender);
  ethnicGroups = Object.values(EthnicGroup);
  bloodTypes = Object.values(BloodType);
  maritalStatuses = Object.values(MaritalStatus);
  allergies = Object.values(PersonAllergies);

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nationalityID = this.route.snapshot.params['nationalityID'];
    this.createForms();
    this.loadPerson();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Quitter', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  createForms(): void {
    // Étape 1 : Détails personnels
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maidenName: [''],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      nationality: ['', Validators.required],
      nationalityID: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicGroup: [''],
    });

    // Étape 2 : Détails de contact
    this.contactDetailsForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      currentAddress: ['', Validators.required],
    });

    // Étape 3 : Détails complémentaires
    this.additionalDetailsForm = this.fb.group({
      maritalStatus: ['SINGLE', Validators.required],
      bloodType: [''],
      allergies: [[]],
      disabilities: [''],
      educationLevel: [''],
      profession: [''],
      occupation: [''],
      religion: [''],
      voterStatus: [''],
      taxIdentificationNumber: [''],
      socialSecurityNumber: [''],
      drivingLicenseNumber: [''],
      passportNumber: [''],
    });

    // Validation dynamique pour le champ "spouseName"
    this.additionalDetailsForm.get('maritalStatus')?.valueChanges.subscribe((status) => {
      const spouseNameControl = this.additionalDetailsForm.get('spouseName');
      if (status === 'MARRIED') {
        spouseNameControl?.setValidators(Validators.required);
      } else {
        spouseNameControl?.clearValidators();
      }
      spouseNameControl?.updateValueAndValidity();
    });
  }

  loadPerson(): void {
    this.personService.getPersonByNationalityID(this.nationalityID).subscribe(
      (person) => {
        this.personalDetailsForm.patchValue(person);
        this.contactDetailsForm.patchValue(person);
        this.additionalDetailsForm.patchValue(person);
      },
      (error) => {
        this.openSnackBar(`Failed to load person. Error: ${error.error.message || 'Unknown error'}`);
      }
    );
  }

  onSubmit(): void {
    if (this.personalDetailsForm.valid && this.contactDetailsForm.valid && this.additionalDetailsForm.valid) {
      const updatedPersonData = {
        ...this.personalDetailsForm.value,
        ...this.contactDetailsForm.value,
        ...this.additionalDetailsForm.value,
      };

      console.log('Payload envoyé au backend:', updatedPersonData);

      this.isSubmitting = true;
      this.personService.editPerson(this.nationalityID, updatedPersonData).subscribe(
        () => {
          this.openSnackBar('Person updated successfully!');
          this.router.navigate(['/persons']); // Redirection après mise à jour
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Erreur serveur:', error);
          this.openSnackBar(`Erreur lors de la mise à jour : ${error.error.message || 'Vérifiez les données et réessayez.'}`);
          this.isSubmitting = false;
        }
      );
    } else {
      alert('Le formulaire contient des erreurs. Veuillez corriger avant de soumettre.');
    }
  }
}
