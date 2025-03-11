import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { inject } from '@angular/core';



@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
})
export class EditPersonComponent implements OnInit {
  personForm!: FormGroup;
  nationalityID!: string;
  isSubmitting = false;

  private _snackBar = inject(MatSnackBar);


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nationalityID = this.route.snapshot.params['nationalityID'];
    this.createForm();
    this.loadPerson();
  }
  

  createForm(): void {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      gender: ['MALE'],
      maritalStatus: ['SINGLE'],
    });
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'RDC', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  loadPerson(): void {
    this.personService.getPersonByNationalityID(this.nationalityID).subscribe(
      (person) => {
        this.personForm.patchValue(person);

      },
      (error) => {
        console.error('Error loading person:', error);
        alert(`Failed to load person. Error: ${error.error.message || 'Unknown error'}`);
      }
    );
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
      this.personService.editPerson(this.nationalityID, this.personForm.value).subscribe(
        () => {
          this.openSnackBar('Mise à jour effectuée avec succès!');
          this.isSubmitting = false;
          // Redirect vers la liste des personnes
          this.router.navigate(['/persons']);

        },
        () => {
          this.isSubmitting = false; // Gestion des erreurs
        }
      );
    }
  }

}
