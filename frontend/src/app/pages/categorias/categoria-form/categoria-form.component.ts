import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaService } from '../../../core/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', Validators.maxLength(500)]
  });

  id?: number;
  error = '';
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get editando() {
    return this.id !== undefined;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.id = Number(id);
    this.categoriaService.obtener(this.id).subscribe({
      next: categoria => this.form.patchValue({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion ?? ''
      }),
      error: () => this.error = 'No se encontró la categoría'
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, descripcion } = this.form.getRawValue();
    const data = { nombre, descripcion: descripcion || null };

    this.guardando = true;
    this.error = '';

    const peticion = this.editando
      ? this.categoriaService.actualizar(this.id!, data)
      : this.categoriaService.crear(data);

    peticion.subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: err => {
        this.error = err.error?.mensaje ?? 'No se pudo guardar la categoría';
        this.guardando = false;
      }
    });
  }
}
