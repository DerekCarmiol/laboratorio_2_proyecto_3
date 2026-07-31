import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Categoria, CategoriaRequest } from './models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private url = `${environment.apiUrl}/api/categorias`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Categoria[]>(this.url);
  }

  obtener(id: number) {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  crear(data: CategoriaRequest) {
    return this.http.post<Categoria>(this.url, data);
  }

  actualizar(id: number, data: CategoriaRequest) {
    return this.http.put<Categoria>(`${this.url}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
