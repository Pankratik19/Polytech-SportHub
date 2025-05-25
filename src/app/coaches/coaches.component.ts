import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachService } from './coach.service';
import { Coach } from './coach';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
})
export class CoachesComponent {
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
}
