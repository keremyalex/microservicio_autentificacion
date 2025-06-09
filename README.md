# Microservicio de Autenticación - Ferretería

Este microservicio maneja la autenticación y autorización para el sistema de ferretería, implementado con NestJS y GraphQL.

## Descripción

El microservicio de autenticación proporciona:
- Autenticación de usuarios mediante JWT
- Gestión de roles (ADMIN, VENDEDOR, ALMACENISTA)
- API GraphQL para operaciones de usuario
- Integración con MongoDB para persistencia de datos

## Requisitos Previos

- Node.js (v20.11.1 o superior)
- Docker y Docker Compose
- MongoDB (se incluye en la configuración de Docker)

## Configuración del Proyecto

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con:
```env
MONGODB_URI=mongodb://localhost:27017/ferreteria
JWT_SECRET=your_jwt_secret
```

## Ejecución del Proyecto

### Usando Docker (Recomendado)

```bash
# Construir y levantar los contenedores
docker-compose up --build

# Para ejecutar en segundo plano
docker-compose up -d
```

### Sin Docker

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

## Usuarios por Defecto

Al iniciar la aplicación por primera vez, se crean automáticamente los siguientes usuarios:

### Administrador
- Email: admin@ferreteria.com
- Contraseña: admin123
- Rol: ADMIN

### Vendedor
- Email: vendedor@ferreteria.com
- Contraseña: vendedor123
- Rol: VENDEDOR

### Almacenista
- Email: almacen@ferreteria.com
- Contraseña: almacen123
- Rol: ALMACENISTA

## API GraphQL

El servicio expone un endpoint GraphQL en `http://localhost:3001/graphql` con las siguientes operaciones principales:

### Mutaciones
- `login(email: String!, password: String!): String!` - Iniciar sesión
- `register(email: String!, password: String!): String!` - Registrar nuevo usuario
- `createUser(createUserInput: CreateUserInput!): User!` - Crear usuario (solo ADMIN)
- `updateUser(updateUserInput: UpdateUserInput!): User!` - Actualizar usuario (solo ADMIN)
- `removeUser(id: String!): Boolean!` - Eliminar usuario (solo ADMIN)

### Queries
- `me: User!` - Obtener información del usuario actual
- `users: [User!]!` - Listar todos los usuarios (solo ADMIN)
- `user(id: String!): User!` - Obtener usuario por ID (solo ADMIN)

## Roles y Permisos

- **ADMIN**: Acceso total al sistema, puede gestionar usuarios
- **VENDEDOR**: Acceso a operaciones de venta
- **ALMACENISTA**: Acceso a operaciones de inventario

## Ejecutar Seeders Manualmente

Si necesitas recrear los usuarios por defecto:

```bash
npm run seed
```

## Desarrollo

```bash
# Ejecutar tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests e2e
npm run test:e2e
```

## Licencia

Este proyecto está bajo la Licencia MIT.
