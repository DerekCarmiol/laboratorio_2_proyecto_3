import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
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

    this.auth.registro(email, password).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => {
        this.error = err.error?.mensaje ?? 'No se pudo completar el registro';
        this.cargando = false;
      }
    });
  }
}
