import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../sports/sports.service';
import { Sport } from '../sports/sport';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.scss'],
})
export class SportDetailsComponent implements OnInit {
  sport?: Sport;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sportService: SportService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid sport ID';
      return;
    }

    this.sportService.getSportById(id).subscribe({
      next: (data) => {
        this.sport = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load sport details';
        console.error(err);
      },
    });
  }
}
