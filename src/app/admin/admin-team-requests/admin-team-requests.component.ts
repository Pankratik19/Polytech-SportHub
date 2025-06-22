import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JoinTeam } from '../../sport-details/joinTeam';
import { CommonModule } from '@angular/common';
import { TeamRequestsService } from './team-requests.service';
import { SportService } from '../../sports/sports.service';

@Component({
  selector: 'app-admin-team-requests',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-team-requests.component.html',
  styleUrl: './admin-team-requests.component.scss',
})
export class AdminTeamRequestsComponent {
  teamRequests: JoinTeam[] = [];
  sportMap: Record<number, string> = {};

  constructor(
    private readonly teamRequestService: TeamRequestsService,
    private readonly sportService: SportService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sportMap = Object.fromEntries(
          sports.map((sport) => [sport.id, sport.name])
        );

        this.loadTeamRequests();
      },
      error: (err) => console.error('Failed to load sports', err),
    });
  }

  private loadTeamRequests(): void {
    this.teamRequestService.getAll().subscribe({
      next: (data) => {
        this.teamRequests = data;
        console.log('Fetched team requests:', data);
      },
      error: (err) => console.error('Failed to load team requests', err),
    });
  }

  getSportNameById(id: number | undefined): string {
    if (id === undefined) return 'Unknown';
    return this.sportMap[id] || 'Unknown';
  }

  approveRequest(id: number | undefined): void {
    if (id === undefined) return;
    this.teamRequestService.approve(id).subscribe({
      next: () => {
        this.updateRequestStatus(id, 'Approved');
      },
      error: (err) =>
        console.error(`Failed to approve request with id ${id}`, err),
    });
  }

  declineRequest(id: number | undefined): void {
    if (id === undefined) return;
    this.teamRequestService.decline(id).subscribe({
      next: () => {
        this.updateRequestStatus(id, 'Rejected');
      },
      error: (err) =>
        console.error(`Failed to decline request with id ${id}`, err),
    });
  }

  private updateRequestStatus(id: number, newStatus: string): void {
    const request = this.teamRequests.find((r) => r.id === id);
    if (request) {
      request.status = newStatus;
    }
  }
}
