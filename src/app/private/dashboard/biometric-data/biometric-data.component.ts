import { Component, OnInit } from '@angular/core';
import { BiometricDataService } from '../../../services/biometric-data.service';
import { BiometricData } from '../../../models/BiometricData.model';
import { MatDialog } from '@angular/material/dialog';
import { BiometricDataAddDialogComponent } from './biometric-data-add-dialog/biometric-data-add-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-biometric-data',
  templateUrl: './biometric-data.component.html',
  styleUrls: ['./biometric-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
})
export class BiometricDataComponent implements OnInit {
  biometricDataList: BiometricData[] = [];
  isLoading = true;

  constructor(
    private biometricDataService: BiometricDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllBiometricData();
  }

  loadAllBiometricData(): void {
    this.biometricDataService.getAllBiometricData().subscribe(
      (data) => {
        this.biometricDataList = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des données biométriques:', error);
        this.isLoading = false;
      }
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BiometricDataAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.biometricDataService.createBiometricData(result).subscribe((newData) => {
          this.biometricDataList.push(newData);
          console.log('Donnée biométrique ajoutée avec succès:', newData);
        });
      }
    });
  }

  deleteBiometricData(id: number): void {
    this.biometricDataService.deleteBiometricData(id).subscribe(
      () => {
        this.biometricDataList = this.biometricDataList.filter((data) => data.id !== id);
        console.log('Donnée biométrique supprimée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la suppression des données biométriques:', error);
      }
    );
  }
}
