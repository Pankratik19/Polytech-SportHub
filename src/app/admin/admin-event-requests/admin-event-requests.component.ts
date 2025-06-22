import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JoinEvent } from '../../events/joinEvent';
import { CommonModule } from '@angular/common';
import { EventRequestsService } from './event-requests.service';
import { EventService } from '../../events/event.service';

@Component({
  selector: 'app-admin-event-requests',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-event-requests.component.html',
  styleUrl: './admin-event-requests.component.scss',
})
export class AdminEventRequestsComponent {
  eventRequests: JoinEvent[] = [];
  eventMap: Record<number, string> = {};

  constructor(
    private readonly eventRequestService: EventRequestsService,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.eventMap = Object.fromEntries(
          events.map((event) => [event.id, event.name])
        );

        this.loadEventRequests();
      },
      error: (err) => console.error('Failed to load events', err),
    });
  }

  private loadEventRequests(): void {
    this.eventRequestService.getAll().subscribe({
      next: (data) => {
        this.eventRequests = data;
        console.log('Fetched event requests:', data);
      },
      error: (err) => console.error('Failed to load event requests', err),
    });
  }

  getEventNameById(id: number | undefined): string {
    if (id === undefined) return 'Unknown';
    return this.eventMap[id] || 'Unknown';
  }

  approveRequest(id: number | undefined): void {
    if (id === undefined) return;
    this.eventRequestService.approve(id).subscribe({
      next: () => {
        this.updateRequestStatus(id, 'Approved');
      },
      error: (err) =>
        console.error(`Failed to approve request with id ${id}`, err),
    });
  }

  declineRequest(id: number | undefined): void {
    if (id === undefined) return;
    this.eventRequestService.decline(id).subscribe({
      next: () => {
        this.updateRequestStatus(id, 'Rejected');
      },
      error: (err) =>
        console.error(`Failed to decline request with id ${id}`, err),
    });
  }

  private updateRequestStatus(id: number, newStatus: string): void {
    const request = this.eventRequests.find((r) => r.id === id);
    if (request) {
      request.status = newStatus;
    }
  }
}
