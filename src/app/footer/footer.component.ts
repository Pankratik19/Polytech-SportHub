import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  showLoginForm = false;
  adminEmail = '';
  adminPassword = '';
  loginError = false;

  private readonly VALID_EMAIL = 'admin@sporthub.com';
  private readonly VALID_PASSWORD = 'admin123';

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
    this.loginError = false;
  }

  login() {
    if (
      this.adminEmail === this.VALID_EMAIL &&
      this.adminPassword === this.VALID_PASSWORD
    ) {
      localStorage.setItem('isAdmin', 'true');
      this.showLoginForm = false;
      this.loginError = false;
      window.location.href = '/admin-main';
    } else {
      this.loginError = true;
    }
  }
}
