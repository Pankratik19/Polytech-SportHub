import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
})
export class CoachesComponent {

  coaches = [
    { name: 'coach1', info: 'lalalala', sports : [
      { name: 'volleyball' },
      { name: 'basketball' },
    ] },
    { name: 'coach2', info: 'aoaooaoa', sports2 : [
      { name: 'badminton' },
    ] },
  ];

  // sports = [
  //   { name: 'volleyball' },
  //   { name: 'basketball' },
  // ]

  // sports2 = [
  //   { name: 'badminton' },
  // ]
  constructor() {}
}
