import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from './event.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  events: Event[] = [];
  tournamentEvents: Event[] = [];
  tableEvents: Event[] = [];

  constructor(private readonly eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.tournamentEvents = data.filter(
          (event) => event.format === 'Tournament'
        );
        this.tableEvents = data.filter((event) => event.format === 'Table');
        console.log('Fetched events:', data);
      },
      error: (err) => {
        console.error('Failed to load events', err);
      },
    });
  }
}
