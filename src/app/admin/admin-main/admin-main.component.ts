import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [AdminHeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.scss',
})
export class AdminMainComponent {
  constructor() {}
}
