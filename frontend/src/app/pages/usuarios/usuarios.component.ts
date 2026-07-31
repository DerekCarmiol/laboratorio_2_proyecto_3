import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../core/usuario.service';
import { ROL_ADMIN, Usuario } from '../../core/models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  readonly rolAdmin = ROL_ADMIN;

  usuarios: Usuario[] = [];
  cargando = true;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.listar().subscribe({
      next: data => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios';
        this.cargando = false;
      }
    });
  }
}
