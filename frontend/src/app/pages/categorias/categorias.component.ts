import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { CategoriaService } from '../../core/categoria.service';
import { Categoria } from '../../core/models';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  cargando = true;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.categoriaService.listar().subscribe({
      next: data => {
        this.categorias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías';
        this.cargando = false;
      }
    });
  }

  eliminar(categoria: Categoria) {
    if (!confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
      return;
    }

    this.error = '';
    this.categoriaService.eliminar(categoria.id).subscribe({
      next: () => this.cargar(),
      error: err => this.error = err.error?.mensaje ?? 'No se pudo eliminar la categoría'
    });
  }
}
