import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sport } from '../../sports/sport';
import { SportService } from '../../sports/sports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sports',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-sports.component.html',
  styleUrl: './admin-sports.component.scss',
})
export class AdminSportsComponent {
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
