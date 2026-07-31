import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Usuario } from './models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuarios`);
  }
}
