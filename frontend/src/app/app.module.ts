import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/auth.interceptor';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoFormComponent } from './pages/productos/producto-form/producto-form.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    ProductosComponent,
    ProductoFormComponent,
    CategoriasComponent,
    CategoriaFormComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
