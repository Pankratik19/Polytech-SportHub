import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../sports/sports.service';
import { Sport } from '../sports/sport';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.scss'],
})
export class SportDetailsComponent implements OnInit {
  sport?: Sport;
  errorMessage = '';
  form: FormGroup;

  selectedFile: File | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sportService: SportService,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      memberName: ['', Validators.required],
      phoneNumber: [null, Validators.required],
      additionalInfo: [''],
      groupNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

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

  submitJoinRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    const requestData = this.form.value;

    this.sportService.submitJoinTeamRequest(eventId, requestData).subscribe({
      next: (response) => {
        this.form.reset();
      },
      error: (error) => {
        console.error('Error submitting request', error);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(sportId: number) {
    if (!this.selectedFile) return;

    this.sportService.uploadPhoto(sportId, this.selectedFile).subscribe({
      next: (res) => console.log('Upload success', res),
      error: (err) => console.error('Upload error', err),
    });
  }

  getSportPhotoUrl(photo: string | null): string {
    return photo
      ? `http://localhost:5264/uploads/${photo}`
      : 'assets/images/ball.png';
  }
}
