import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sport } from '../sports/sport';
import { SportService } from '../sports/sports.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
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

  getSportPhotoUrl(photo: string | null): string {
    return photo
      ? `http://localhost:5264/uploads/${photo}`
      : 'assets/images/ball.png';
  }
}
