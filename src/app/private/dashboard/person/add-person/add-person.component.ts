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
    MatStepperModule,
    MatProgressBarModule,
  ],
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
})
export class AddPersonComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  contactDetailsForm!: FormGroup;
  additionalDetailsForm!: FormGroup;
  isSubmitting = false;


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

  constructor(private fb: FormBuilder, private personService: PersonService) {}

  ngOnInit(): void {
    this.createForms();
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

  onSubmit(): void {
    if (this.personalDetailsForm.valid && this.contactDetailsForm.valid && this.additionalDetailsForm.valid) {
      const personData = {
        ...this.personalDetailsForm.value,
        ...this.contactDetailsForm.value,
        ...this.additionalDetailsForm.value,
      };

      console.log('Payload envoyé au backend:', personData); // Vérifie ce qui est envoyé

      // Vérifie si les champs critiques sont corrects
      if (!personData.birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        this.openSnackBar('Invalid date format. Use yyyy-MM-dd.');
        return;
      }

      this.isSubmitting = true;
      this.personService.addPerson(personData).subscribe(
        () => {
          this.openSnackBar('Person added successfully!');
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Erreur serveur:', error);
          this.openSnackBar(`Erreur lors de l'ajout : ${error.error.message || 'Vérifiez les données et réessayez.'}`);
          this.isSubmitting = false;
        }
      );
    } else {
      this.openSnackBar('Le formulaire contient des erreurs. Veuillez corriger avant de soumettre.');
    }
  }

}
