# Front-end — CRUD en Angular 17

SPA en **Angular 17** que consume la API REST de [`../backend/`](../backend/) (Spring Boot + JWT).
Implementa dos CRUD completos —**Producto** y **Categoría**— con control de acceso por roles,
inicio de sesión, registro de usuarios y una página de usuarios restringida a `SUPER-ADMIN-ROLE`.

## Requisitos

- Node 18.13+ o 20.9+
- El back-end corriendo en `http://localhost:8080` (ver [`../backend/README.md`](../backend/README.md))

## Cómo ejecutar

```bash
npm install
npm start
```

La aplicación queda en `http://localhost:4200`.

La URL del back-end se configura en `src/environments/environment.development.ts`.

## Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| `superadmin@proyecto3.com` | `admin123` | `SUPER-ADMIN-ROLE` |
| `user@proyecto3.com` | `user123` | `USER` |

Desde `/registro` se pueden crear cuentas nuevas; siempre se crean con rol `USER`.

## Estructura

```
src/app/
├── core/                        lógica transversal
│   ├── models.ts                interfaces de las entidades
│   ├── auth.service.ts          sesión (signals + localStorage)
│   ├── auth.interceptor.ts      agrega el Bearer token, desloguea ante 401
│   ├── guards.ts                authGuard y adminGuard
│   ├── producto.service.ts
│   ├── categoria.service.ts
│   └── usuario.service.ts
├── shared/
│   └── navbar/                  menú, oculta opciones según el rol
└── pages/
    ├── login/
    ├── registro/
    ├── productos/
    │   ├── productos.component.*        listado
    │   └── producto-form/               registrar y actualizar
    ├── categorias/
    │   ├── categorias.component.*       listado
    │   └── categoria-form/              registrar y actualizar
    └── usuarios/                        solo SUPER-ADMIN-ROLE
```

## Rutas y permisos

| Ruta | Acceso |
|---|---|
| `/login`, `/registro` | Público |
| `/productos`, `/categorias` | Autenticado (`USER` y `SUPER-ADMIN-ROLE`) |
| `/productos/nuevo`, `/productos/editar/:id` | `SUPER-ADMIN-ROLE` |
| `/categorias/nuevo`, `/categorias/editar/:id` | `SUPER-ADMIN-ROLE` |
| `/usuarios` | `SUPER-ADMIN-ROLE` |

## Manejo de roles

La restricción es doble, como pide el enunciado:

1. **Por menú**: la barra de navegación no muestra el enlace *Usuarios* si el usuario no es
   `SUPER-ADMIN-ROLE`, y los listados de productos y categorías ocultan los botones de
   registrar, editar y eliminar.
2. **Por URL**: `adminGuard` bloquea el acceso directo a las rutas protegidas aunque se
   escriban a mano en la barra de direcciones, redirigiendo a `/productos`.

Un usuario con rol `USER` puede consultar productos y categorías, pero no modificarlos.
El back-end también rechaza esas operaciones con `403`, de modo que la restricción no
depende únicamente del cliente.

## Componente de formulario reutilizado

`producto-form` y `categoria-form` sirven tanto para registrar como para actualizar.
Distinguen el modo por el parámetro `:id` de la ruta: sin `id` envían un `POST`;
con `id` cargan el registro existente y envían un `PUT`.

## Endpoints consumidos

| Método | Endpoint | Rol |
|---|---|---|
| `POST` | `/auth/login` | Público |
| `POST` | `/auth/register` | Público |
| `GET` | `/api/productos`, `/api/productos/{id}` | Autenticado |
| `POST` / `PUT` / `DELETE` | `/api/productos`, `/api/productos/{id}` | `SUPER-ADMIN-ROLE` |
| `GET` | `/api/categorias`, `/api/categorias/{id}` | Autenticado |
| `POST` / `PUT` / `DELETE` | `/api/categorias`, `/api/categorias/{id}` | `SUPER-ADMIN-ROLE` |
| `GET` | `/api/usuarios` | `SUPER-ADMIN-ROLE` |
