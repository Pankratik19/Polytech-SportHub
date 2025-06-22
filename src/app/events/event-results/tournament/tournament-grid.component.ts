import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';
import { Match } from './match';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-grid',
  imports: [CommonModule],
  templateUrl: './tournament-grid.component.html',
  styleUrls: ['./tournament-grid.component.scss'],
})
export class TournamentGridComponent implements OnInit {
  matches: Match[] = [];
  errorMessage = '';
  rounds: { [round: number]: Match[] } = {};
  sortedRounds: { key: number; value: Match[] }[] = [];
  tournamentWinner?: Match['winner'];
  eventName = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (!eventId) {
      this.errorMessage = 'Invalid event ID';
      return;
    }

    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.eventName = event.name;
      },
      error: (err) => {
        console.error('Failed to load event name', err);
      },
    });

    this.eventService.getTournamentMatchesByEventId(eventId).subscribe({
      next: (data) => {
        this.matches = data;
        this.groupMatchesByRound();
        this.sortRounds();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load matches';
        console.error(err);
      },
    });
  }

  private groupMatchesByRound() {
    this.rounds = {};
    for (const match of this.matches) {
      if (!this.rounds[match.round]) {
        this.rounds[match.round] = [];
      }
      this.rounds[match.round].push(match);
    }
  }

  private sortRounds() {
    this.sortedRounds = Object.entries(this.rounds)
      .map(([key, value]) => ({ key: +key, value }))
      .sort((a, b) => a.key - b.key);

    const finalRound = this.sortedRounds[this.sortedRounds.length - 1];
    const finalMatch = finalRound?.value[finalRound.value.length - 1];

    if (finalMatch?.winner) {
      this.tournamentWinner = finalMatch.winner;
    }
  }
}
