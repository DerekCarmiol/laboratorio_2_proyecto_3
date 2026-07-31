import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Producto, ProductoRequest } from './models';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  private url = `${environment.apiUrl}/api/productos`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

  obtener(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  crear(data: ProductoRequest) {
    return this.http.post<Producto>(this.url, data);
  }

  actualizar(id: number, data: ProductoRequest) {
    return this.http.put<Producto>(`${this.url}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
