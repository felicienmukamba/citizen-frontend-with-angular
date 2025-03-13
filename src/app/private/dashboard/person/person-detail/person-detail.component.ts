import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { Person } from '../../../../models/Person.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatList, MatListItem, MatListSubheaderCssMatStyler } from '@angular/material/list';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    DatePipe,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {
  nationalityID!: string;
  person!: Person;
  loadingError: boolean = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nationalityID = this.route.snapshot.params['nationalityID'];
    if (this.nationalityID) {
      this.loadPerson();
    } else {
      console.error('No nationalityID provided in the route.');
      alert('Unable to load person details. Invalid nationalityID.');
    }
  }

  loadPerson(): void {
    this.personService.getPersonByNationalityID(this.nationalityID).subscribe(
      (person) => {
        this.person = person;
        this.loadingError = false;
      },
      (error) => {
        console.error('Error loading person:', error);
        this.loadingError = true;
      }
    );
  }
}
