import { Routes } from '@angular/router';
import { PersonListComponent } from './private/dashboard/person/person-list/person-list.component';
import { AddPersonComponent } from './private/dashboard/person/add-person/add-person.component';
import { EditPersonComponent } from './private/dashboard/person/edit-person/edit-person.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { BiometricDataComponent } from './private/dashboard/biometric-data/biometric-data.component';
import { PersonDetailComponent } from './private/dashboard/person/person-detail/person-detail.component';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Dashboard route
  { path: 'dashboard', component: DashboardComponent },

  // Person-related routes
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/add', component: AddPersonComponent },
  { path: 'persons/:nationalityID', component: PersonDetailComponent },
  { path: 'persons/edit/:nationalityID', component: EditPersonComponent },

  // Biometric Data Route
  {
    path: 'biometric-data',
    loadComponent: () =>
      import('./private/dashboard/biometric-data/biometric-data.component').then(
        (m) => m.BiometricDataComponent
      ),
  },

  // Birth Record Route
  {
    path: 'birth-record',
    loadComponent: () =>
      import('./private/dashboard/birth-record/birth-record.component').then(
        (m) => m.BirthRecordComponent
      ),
  },

  // Marriage Record Route
  {
    path: 'marriage-record',
    loadComponent: () =>
      import('./private/dashboard/marriage-record/marriage-record.component').then(
        (m) => m.MarriageRecordComponent
      ),
  },

  // Death Record Route
  {
    path: 'death-record',
    loadComponent: () =>
      import('./private/dashboard/death-record/death-record.component').then(
        (m) => m.DeathRecordComponent
      ),
  },

  // Health Record Route
  {
    path: 'health-record',
    loadComponent: () =>
      import('./private/dashboard/health-record/health-record.component').then(
        (m) => m.HealthRecordComponent
      ),
  },

  // Criminal Record Route
  {
    path: 'criminal-record',
    loadComponent: () =>
      import('./private/dashboard/criminal-record/criminal-record.component').then(
        (m) => m.CriminalRecordComponent
      ),
  },

  // Complaint List Route
  {
    path: 'complaint-list',
    loadComponent: () =>
      import('./private/dashboard/complaint-list/complaint-list.component').then(
        (m) => m.ComplaintListComponent
      ),
  },
];



