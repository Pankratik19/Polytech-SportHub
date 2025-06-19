import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-form',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sport-form.component.html',
  styleUrl: './sport-form.component.scss',
})
export class SportFormComponent {
  constructor() {}
}
