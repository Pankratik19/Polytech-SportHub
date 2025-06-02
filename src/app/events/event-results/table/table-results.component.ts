import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';
import { TableResult } from './table-result';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-results',
  imports: [CommonModule],
  templateUrl: './table-results.component.html',
  styleUrl: './table-results.component.scss',
})
export class TableResultsComponent {
  tableResults: TableResult[] = [];
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid event ID';
      return;
    }

    this.eventService.getTableResultsByEventId(id).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const direction = data[0].event.direction;

          if (direction === 'Ascending') {
            this.tableResults = [...data].sort(
              (a, b) => Number(a.result) - Number(b.result)
            );
          } else if (direction === 'Descending') {
            this.tableResults = [...data].sort(
              (a, b) => Number(b.result) - Number(a.result)
            );
          } else {
            this.tableResults = data;
          }
        } else {
          this.tableResults = [];
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to load event results';
        console.error(err);
      },
    });
  }

  getPlaceSuffix(place: number): string {
    if (place === 1) return 'st';
    if (place === 2) return 'nd';
    if (place === 3) return 'rd';
    return 'th';
  }
}
