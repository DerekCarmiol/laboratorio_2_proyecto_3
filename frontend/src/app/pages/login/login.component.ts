import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.cargando = true;
    this.error = '';

    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => {
        this.error = err.error?.mensaje ?? 'No se pudo iniciar sesión';
        this.cargando = false;
      }
    });
  }
}
