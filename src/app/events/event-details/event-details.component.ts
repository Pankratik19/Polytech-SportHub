import { Component } from '@angular/core';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  event!: Event;
  errorMessage = '';
  form: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      memberNames: ['', Validators.required],
      memberCount: [null, Validators.required],
      groupNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid event ID';
      return;
    }

    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load event details';
        console.error(err);
      },
    });
  }

  getTypeEventIcon(type: string | undefined): string {
    switch (type) {
      case 'Team':
        return 'assets/images/team.png';
      case 'Individual':
        return 'assets/images/individual.png';
      default:
        return 'assets/images/type_unknown.png';
    }
  }

  getFormatIcon(format: string | undefined): string {
    switch (format) {
      case 'Tournament':
        return 'assets/images/tournament.png';
      case 'Table':
        return 'assets/images/table.png';
      default:
        return 'assets/images/format_unknown.png';
    }
  }

  getGenderIcon(gender: string | undefined): string {
    switch (gender) {
      case 'Male':
        return 'assets/images/male.png';
      case 'Female':
        return 'assets/images/female.png';
      case 'Unisex':
        return 'assets/images/unisex.png';
      default:
        return 'assets/icons/gender_unknown.png';
    }
  }

  submitJoinRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    const requestData = this.form.value;

    this.eventService.submitJoinEventRequest(eventId, requestData).subscribe({
      next: (response) => {
        this.form.reset();
      },
      error: (error) => {
        console.error('Error submitting request', error);
      },
    });
  }
}
