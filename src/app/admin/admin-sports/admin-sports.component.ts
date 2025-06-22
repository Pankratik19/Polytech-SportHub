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

  deleteSport(id: number): void {
    if (confirm('Are you sure you want to delete this sport?')) {
      this.sportService.deleteSport(id).subscribe({
        next: () => {
          this.sports = this.sports.filter((s) => s.id !== id);
          alert('✅ Sport was deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete sport:', err);
          alert('❌ Failed to delete sport');
        },
      });
    }
  }

  getSportPhotoUrl(photo: string | null): string {
    return photo
      ? `http://localhost:5264/uploads/${photo}`
      : 'assets/images/profile.jpg';
  }
}
