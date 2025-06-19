import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachService } from './coach.service';
import { Coach } from './coach';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
})
export class CoachesComponent {
  coaches: Coach[] = [];
  selectedFile: File | null = null;

  constructor(private readonly coachService: CoachService) {}

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe({
      next: (data) => {
        this.coaches = data;
        console.log('Fetched coaches:', data);
      },
      error: (err) => {
        console.error('Failed to load coaches', err);
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

    this.coachService.uploadPhoto(sportId, this.selectedFile).subscribe({
      next: (res) => console.log('Upload success', res),
      error: (err) => console.error('Upload error', err),
    });
  }

  getCoachPhotoUrl(photo: string | null): string {
    return photo
      ? `http://localhost:5264/uploads/${photo}`
      : 'assets/images/profile.jpg';
  }
}
