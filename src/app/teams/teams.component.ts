import { Component } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {
  teams: Team[] = [];

  constructor(private readonly teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        console.log('Fetched teams:', data);
      },
      error: (err) => {
        console.error('Failed to load teams', err);
      },
    });
  }
}
