import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(public auth: AuthService, private router: Router) {}

  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
