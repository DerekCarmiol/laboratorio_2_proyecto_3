import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaService } from '../../../core/categoria.service';
import { ProductoService } from '../../../core/producto.service';
import { Categoria } from '../../../core/models';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', Validators.maxLength(500)],
    precio: [0, [Validators.required, Validators.min(0)]],
    cantidadEnStock: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null as number | null, Validators.required]
  });

  categorias: Categoria[] = [];
  id?: number;
  error = '';
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get editando() {
    return this.id !== undefined;
  }

  ngOnInit() {
    this.categoriaService.listar().subscribe({
      next: data => this.categorias = data,
      error: () => this.error = 'No se pudieron cargar las categorías'
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.id = Number(id);
    this.productoService.obtener(this.id).subscribe({
      next: producto => this.form.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? '',
        precio: producto.precio,
        cantidadEnStock: producto.cantidadEnStock,
        categoriaId: producto.categoria.id
      }),
      error: () => this.error = 'No se encontró el producto'
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor = this.form.getRawValue();
    const data = {
      nombre: valor.nombre,
      descripcion: valor.descripcion || null,
      precio: Number(valor.precio),
      cantidadEnStock: Number(valor.cantidadEnStock),
      categoriaId: Number(valor.categoriaId)
    };

    this.guardando = true;
    this.error = '';

    const peticion = this.editando
      ? this.productoService.actualizar(this.id!, data)
      : this.productoService.crear(data);

    peticion.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => {
        this.error = err.error?.mensaje ?? 'No se pudo guardar el producto';
        this.guardando = false;
      }
    });
  }
}
