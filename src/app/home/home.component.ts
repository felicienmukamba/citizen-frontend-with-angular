import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDrawer,
    MatDrawerContainer, MatDrawerContent,
    MatList, MatListItem,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items = [
    { name: 'Item 1', icon: 'home' },
    { name: 'Item 2', icon: 'favorite' },
    { name: 'Item 3', icon: 'settings' },
    { name: 'Item 4', icon: 'exit_to_app' },
  ]
}
