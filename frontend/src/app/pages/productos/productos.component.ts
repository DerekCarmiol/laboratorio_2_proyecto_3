import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { ProductoService } from '../../core/producto.service';
import { Producto } from '../../core/models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  cargando = true;
  error = '';

  constructor(
    private productoService: ProductoService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.productoService.listar().subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  eliminar(producto: Producto) {
    if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
      return;
    }

    this.error = '';
    this.productoService.eliminar(producto.id).subscribe({
      next: () => this.cargar(),
      error: err => this.error = err.error?.mensaje ?? 'No se pudo eliminar el producto'
    });
  }
}
