import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-players',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-players.component.html',
  styleUrl: './admin-players.component.scss',
})
export class AdminPlayersComponent {
  constructor() {}
}
