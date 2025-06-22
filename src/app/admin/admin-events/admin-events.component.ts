import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../events/event.service';
import { Event } from '../../events/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
})
export class AdminEventsComponent {
  events: Event[] = [];
  
    constructor(private readonly eventService: EventService ) {}
  
    ngOnInit(): void {
      this.eventService.getEvents().subscribe({
        next: (data) => {
          this.events = data;
          console.log('Fetched events:', data);
        },
        error: (err) => {
          console.error('Failed to load events', err);
        },
      });
    }
  }
