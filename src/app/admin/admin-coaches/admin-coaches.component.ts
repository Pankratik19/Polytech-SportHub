import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Coach } from '../../coaches/coach';
import { CoachService } from '../../coaches/coach.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-coaches',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-coaches.component.html',
  styleUrl: './admin-coaches.component.scss',
})
export class AdminCoachesComponent {
  coaches: Coach[] = [];

  constructor(private readonly coachService: CoachService) {}

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe({
      next: (data) => {
        this.coaches = data;
        console.log('Fetched coaches:', data);
      },
      error: (err) => {
        console.error('Failed to load coaches', err);
      },
    });
  }

  getCoachPhotoUrl(photo: string | null): string {
    return photo
      ? `http://localhost:5264/uploads/${photo}`
      : 'assets/images/profile.jpg';
  }
}
