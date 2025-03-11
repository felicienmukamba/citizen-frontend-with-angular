import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // private apiUrl = `${environment.apiBaseUrl}/persons`;
  private apiUrl = 'http://localhost:8080/persons'; // Changez selon votre backend


  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getPersonByNationalityID(nationalityID: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${nationalityID}`);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  addPersons(persons: Person[]): Observable<Person[]> {
    return this.http.post<Person[]>(`${this.apiUrl}/all`, persons);
  }

  editPerson(nationalityID: string, person: Person): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${nationalityID}`, person);
  }

  deletePerson(nationalityID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nationalityID}`);
  }

}