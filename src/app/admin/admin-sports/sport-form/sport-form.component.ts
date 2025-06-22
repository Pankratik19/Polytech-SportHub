import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SportService } from '../../../sports/sports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-sport-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.scss'],
})
export class SportFormComponent implements OnInit {
  form!: FormGroup;
  photoFile: File | null = null;
  sportId: number | null = null;
  existingPhotoUrl: string | null = null;
  photoPreviewUrl: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly sportService: SportService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      infoText: ['', Validators.required], 
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sportId = +id;
      this.sportService.getSportById(this.sportId).subscribe((sport) => {
        this.form.patchValue({
          id: sport.id,
          name: sport.name,
          infoText: sport.info?.[0]?.text || '',
        });

        if (sport.photo) {
          this.existingPhotoUrl = `http://localhost:5264/uploads/${sport.photo}`;
        }
      });
    }
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const sportData = {
      name: this.form.value.name,
      photo: '',
      info: [
        {
          text: this.form.value.infoText,
          photo: '',
        },
      ],
    };

    if (this.sportId) {
      const updateData = { ...sportData, id: this.sportId };
      this.sportService.updateSport(this.sportId, updateData).subscribe(() => {
        alert('Sport updated.');
        this.uploadPhoto();
      });
    } else {
      this.sportService.createSport(sportData).subscribe((sport) => {
        this.sportId = sport.id ?? null;
        alert('Sport created.');
        this.uploadPhoto();
      });
    }
  }

  uploadPhoto() {
    if (!this.sportId || !this.photoFile) {
      this.location.back();
      return;
    }

    this.sportService.uploadPhoto(this.sportId, this.photoFile).subscribe({
      next: () => {
        alert('Photo uploaded successfully!');
        this.location.back();
      },
      error: () => alert('Photo upload failed.'),
    });
  }
}
