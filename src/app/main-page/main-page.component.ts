import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {

  cards = [
    { title: 'Volleyball', imageUrl: '' },
    { title: 'Basketball', imageUrl: '' },
    { title: 'Tennis', imageUrl: '' },
    { title: 'Soccer', imageUrl: '' },
    { title: 'Baseball', imageUrl: '' },
    { title: 'Swimming', imageUrl: '' },
  ];
  constructor() {}
}
