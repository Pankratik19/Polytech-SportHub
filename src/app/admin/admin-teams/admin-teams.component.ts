import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Team } from '../../teams/team';
import { TeamService } from '../../teams/team.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-teams',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-teams.component.html',
  styleUrl: './admin-teams.component.scss',
})
export class AdminTeamsComponent {
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
