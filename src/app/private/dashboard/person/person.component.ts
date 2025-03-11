import { Component } from '@angular/core';
import { PersonListComponent } from "./person-list/person-list.component";

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [PersonListComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {

}
