import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthResponse, ROL_ADMIN } from './models';

const STORAGE_KEY = 'sesion';

interface Sesion {
  token: string;
  email: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private sesion = signal<Sesion | null>(leerSesion());

  readonly usuario = this.sesion.asReadonly();
  readonly isAdmin = computed(() => this.sesion()?.rol === ROL_ADMIN);
  readonly logueado = computed(() => this.sesion() !== null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.guardar(res)));
  }

  registro(email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, { email, password })
      .pipe(tap(res => this.guardar(res)));
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.sesion.set(null);
  }

  get token() {
    return this.sesion()?.token ?? null;
  }

  private guardar(res: AuthResponse) {
    const sesion: Sesion = { token: res.token, email: res.email, rol: res.rol };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
    this.sesion.set(sesion);
  }
}

function leerSesion(): Sesion | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
