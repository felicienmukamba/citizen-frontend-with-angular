import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiometricData } from '../models/BiometricData.model';
import { Person } from '../models/Person.model';


@Injectable({
  providedIn: 'root'
})
export class BiometricDataService {
  private apiUrl = 'http://localhost:8080/biometric-data';
  private apiUrlPerson = 'http://localhost:8080/persons'; // Changez selon votre backend


  constructor(private http: HttpClient) {}

    getPersonByNationalityID(nationalityID: string): Observable<Person> {
      return this.http.get<Person>(`${this.apiUrlPerson}/${nationalityID}`);
    }

  // Créer une nouvelle donnée biométrique
  createBiometricData(data: BiometricData): Observable<BiometricData> {
    return this.http.post<BiometricData>(`${this.apiUrl}`, data);
  }

  // Récupérer une donnée biométrique par ID
  getBiometricDataById(id: number): Observable<BiometricData> {
    return this.http.get<BiometricData>(`${this.apiUrl}/${id}`);
  }

  // Récupérer une donnée biométrique par Person ID
  getBiometricDataByPersonId(personId: number): Observable<BiometricData> {
    return this.http.get<BiometricData>(`${this.apiUrl}/person/${personId}`);
  }

  // Récupérer toutes les données biométriques
  getAllBiometricData(): Observable<BiometricData[]> {
    return this.http.get<BiometricData[]>(`${this.apiUrl}`);
  }

  // Supprimer une donnée biométrique
  deleteBiometricData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
