import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard, authGuard } from './core/guards';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoFormComponent } from './pages/productos/producto-form/producto-form.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'productos/nuevo', component: ProductoFormComponent, canActivate: [adminGuard] },
  { path: 'productos/editar/:id', component: ProductoFormComponent, canActivate: [adminGuard] },

  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'categorias/nuevo', component: CategoriaFormComponent, canActivate: [adminGuard] },
  { path: 'categorias/editar/:id', component: CategoriaFormComponent, canActivate: [adminGuard] },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [adminGuard] },

  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
