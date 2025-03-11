import { Routes } from '@angular/router';
import { PersonListComponent } from './private/dashboard/person/person-list/person-list.component';
import { AddPersonComponent } from './private/dashboard/person/add-person/add-person.component';
import { EditPersonComponent } from './private/dashboard/person/edit-person/edit-person.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { PersonDetailComponent } from './private/dashboard/person/person-detail/person-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/add', component: AddPersonComponent },
  { path: 'persons/:nationalityID', component: PersonDetailComponent },
  { path: 'persons/edit/:nationalityID', component: EditPersonComponent }

];

// import { Routes } from '@angular/router';
// import { PersonListComponent } from './private/dashboard/person/person-list/person-list.component';
// import { AddPersonComponent } from './private/dashboard/person/add-person/add-person.component';
// import { EditPersonComponent } from './private/dashboard/person/edit-person/edit-person.component';
// import { DashboardComponent } from './private/dashboard/dashboard.component';


// export const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: DashboardComponent },
//   { path: 'dashboard', component: DashboardComponent},
//   { path: 'persons', component: PersonListComponent },
//   { path: 'persons/add', component: AddPersonComponent },
//   { path: 'persons/edit/:nationalityID', component: EditPersonComponent }

// ];
