import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Player } from '../../teams/player';
import { PlayerService } from '../../teams/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-players',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-players.component.html',
  styleUrl: './admin-players.component.scss',
})
export class AdminPlayersComponent {
  players: Player[] = [];

  constructor(private readonly playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        console.log('Fetched players:', data);
      },
      error: (err) => {
        console.error('Failed to load players', err);
      },
    });
  }
}
