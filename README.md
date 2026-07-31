# Proyecto 3 — CRUD de Productos y Categorías

Sistema completo con dos CRUD —**Producto** y **Categoría**— y control de acceso por roles
(`SUPER-ADMIN-ROLE` y `USER`), compuesto por una API REST en Spring Boot y un cliente web en
Angular 17.

```
├── backend/     API REST — Spring Boot 3.5 + Spring Security (JWT) + MySQL
└── frontend/    SPA — Angular 17
```

| Módulo | Tecnología | Puerto | Documentación |
|---|---|---|---|
| [`backend/`](backend/) | Java 21, Spring Boot 3.5.6, MySQL 8 | `8080` | [backend/README.md](backend/README.md) |
| [`frontend/`](frontend/) | Angular 17.3, TypeScript 5.4 | `4200` | [frontend/README.md](frontend/README.md) |

## Puesta en marcha

Se necesitan **Java 21**, **Node 18.13+ o 20.9+** y **MySQL 8** (o Docker).

### 1. Base de datos

```bash
cd backend
docker compose up -d
```

Levanta MySQL 8 en el puerto `3306` y crea la base `proyecto3_db`. Si se usa una instalación
local de MySQL en lugar de Docker, hay que ajustar usuario y contraseña en
`backend/src/main/resources/application.properties`.

### 2. Back-end

```bash
cd backend

# Windows
.\mvnw.cmd spring-boot:run

# Linux / Mac
./mvnw spring-boot:run
```

La API queda en `http://localhost:8080`. Al arrancar se crean los roles y los dos usuarios
de prueba.

### 3. Front-end

```bash
cd frontend
npm install
npm start
```

La aplicación queda en `http://localhost:4200`.

## Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| `superadmin@proyecto3.com` | `admin123` | `SUPER-ADMIN-ROLE` |
| `user@proyecto3.com` | `user123` | `USER` |

También se pueden crear cuentas desde `/registro`; siempre se crean con rol `USER`.

## Modelo de datos

- **Categoría**: `id`, `nombre`, `descripcion`.
- **Producto**: `id`, `nombre`, `descripcion`, `precio`, `cantidadEnStock`, `categoria`.
- Un producto pertenece a **una** categoría; una categoría puede tener varios productos.
- **Usuario**: `id`, `email`, `password` (BCrypt), `rol`.
- **Rol**: `SUPER-ADMIN-ROLE` y `USER`.

## Permisos

| Acción | `USER` | `SUPER-ADMIN-ROLE` |
|---|:---:|:---:|
| Consultar Productos y Categorías | ✅ | ✅ |
| Registrar, actualizar y borrar Productos y Categorías | ❌ | ✅ |
| Ver los usuarios registrados | ❌ | ✅ |

La restricción se aplica en tres niveles: el **menú** oculta las opciones no permitidas, los
**guards** del router bloquean el acceso escribiendo la URL a mano, y el **back-end** rechaza
la operación con `403` aunque la petición llegue por otro medio.

Sin token, o con un token expirado, la API responde `401`.
