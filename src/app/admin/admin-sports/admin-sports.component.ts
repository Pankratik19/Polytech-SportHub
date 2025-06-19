import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sports',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-sports.component.html',
  styleUrl: './admin-sports.component.scss',
})
export class AdminSportsComponent {
  constructor() {}
}
