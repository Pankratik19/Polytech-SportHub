import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sport } from '../sports/sport';
import { SportService } from '../sports/sports.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  sports: Sport[] = [];

  constructor(private readonly sportService: SportService) {}

  ngOnInit(): void {
    this.sportService.getSports().subscribe({
      next: (data) => {
        this.sports = data;
        console.log('Fetched sports:', data);
      },
      error: (err) => {
        console.error('Failed to load sports', err);
      },
    });
  }
}
