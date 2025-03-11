import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Person } from '../../../../models/Person.model';
import { PersonService } from '../../../../services/person.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AddPersonComponent } from '../add-person/add-person.component';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class PersonListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'actions'];
  dataSource: MatTableDataSource<Person> = new MatTableDataSource();
  filterForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personService: PersonService, private fb: FormBuilder, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.createFilterForm();
    this.fetchPersons();
    this.watchFilters();
  }

  createFilterForm(): void {
    this.filterForm = this.fb.group({
      search: [''],
      gender: [''],
      maritalStatus: ['']
    });
  }

  fetchPersons(): void {
    this.personService.getAllPersons().subscribe((persons) => {
      this.dataSource = new MatTableDataSource(persons);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  watchFilters(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filters) => {
        this.applyAdvancedFilters(filters);
      });
  }

  applyAdvancedFilters(filters: any): void {
    this.dataSource.filterPredicate = (data: Person, filter: string) => {
      const searchText = filters.search ? filters.search.toLowerCase() : '';
      const gender = filters.gender ? filters.gender.toLowerCase() : '';
      const maritalStatus = filters.maritalStatus ? filters.maritalStatus.toLowerCase() : '';

      return (
        (data.firstName.toLowerCase().includes(searchText) ||
          data.lastName.toLowerCase().includes(searchText) ||
          data.emailAddress.toLowerCase().includes(searchText)) &&
        (!gender || data.gender.toLowerCase() === gender) &&
        (!maritalStatus || data.maritalStatus?.toLowerCase() === maritalStatus)
      );
    };

    this.dataSource.filter = JSON.stringify(filters);
  }

  addPerson(): void {
    console.log('Navigating to Add Person page');
    this.router.navigate(['/persons/add']); // Navigates to the Add Person page
  }

  // addPerson(): void {
  //   console.log('Opening Add Person Dialog');
  //   const dialogRef = this.dialog.open(AddPersonComponent, {
  //     width: '600px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Call the backend to add a new person
  //       this.personService.addPerson(result).subscribe(() => {
  //         alert('Person added successfully!');
  //         this.fetchPersons(); // Refresh the list of persons
  //       });
  //     }
  //   });
  // }


  editPerson(person: Person): void {
    if (person && person.nationalityID) {
      console.log(`Navigating to Edit Person page for ${person.nationalityID}`);
      this.router.navigate(['/persons/edit', person.nationalityID]); // Ensure parameter is correct
    } else {
      console.error('Person or nationalityID is missing!');
    }
  }



  // editPerson(person: Person): void {
  //   console.log('Opening Edit Person Dialog for:', person);
  //   const dialogRef = this.dialog.open(EditPersonComponent, {
  //     width: '600px',
  //     data: { ...person } // Passes the person object to the dialog
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Call the backend to update the person
  //       this.personService.editPerson(person.nationalityID, result).subscribe(() => {
  //         alert('Person updated successfully!');
  //         this.fetchPersons(); // Refresh the list of persons
  //       });
  //     }
  //   });
  // }


  deletePerson(nationalityID: string): void {
    this.personService.deletePerson(nationalityID).subscribe(() => {
      this.fetchPersons();
    });
  }

viewPerson(person: Person): void {
  if (person && person.nationalityID) {
    console.log(`Navigating to View Person page for ${person.nationalityID}`);
    this.router.navigate(['/persons', person.nationalityID]);
    // Ensure parameter is correct
  } else {
    console.error('Person or nationalityID is missing!');
  }
}

}
