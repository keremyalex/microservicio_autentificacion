# Microservicio de Autenticación - Ferretería

Este microservicio maneja la autenticación y autorización para el sistema de ferretería, implementado con NestJS y GraphQL.

## Descripción

El microservicio de autenticación proporciona:
- Autenticación de usuarios mediante JWT
- Gestión de roles (ADMIN, VENDEDOR, ALMACENISTA)
- API GraphQL para operaciones de usuario
- Integración con MongoDB para persistencia de datos
- Soporte para entornos de desarrollo y producción
- Configuración flexible mediante variables de entorno

## Requisitos Previos

- Node.js (v20.11.1 o superior)
- Docker y Docker Compose
- MongoDB (se incluye en la configuración de Docker para desarrollo)

## Configuración del Proyecto

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

### Variables de Entorno Requeridas
```env
# Entorno (development | production)
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://mongodb:27017/ferreteria  # Para desarrollo
# MONGODB_URI=mongodb+srv://...  # Para producción

# JWT
JWT_SECRET=your_jwt_secret
```

### Variables de Entorno Opcionales
```env
# Puertos (valores por defecto)
API_PORT=3001      # Puerto de la API
PORT=3000         # Puerto interno de la aplicación
MONGODB_PORT=27017 # Puerto de MongoDB
```

## Ejecución del Proyecto

### Usando Docker (Recomendado)

#### Desarrollo (MongoDB Local)
```bash
# Configurar .env para desarrollo
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/ferreteria

# Construir y levantar los contenedores
docker-compose up --build

# Para ejecutar en segundo plano
docker-compose up -d
```

#### Producción (MongoDB Remoto)
```bash
# Configurar .env para producción
NODE_ENV=production
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@tu_cluster.railway.app/ferreteria

# Construir y levantar solo el contenedor de la API
docker-compose up --build
```

### Sin Docker

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

## Comportamiento por Entorno

### Desarrollo (`NODE_ENV=development`)
- ✅ Se inicia MongoDB local en un contenedor Docker
- ✅ La API se conecta a MongoDB local
- ✅ Los datos persisten en un volumen Docker
- ✅ Ideal para desarrollo y pruebas

### Producción (`NODE_ENV=production`)
- ✅ No se inicia MongoDB local
- ✅ La API se conecta a tu MongoDB remoto (ej: Railway)
- ✅ Solo se ejecuta el contenedor de la API
- ✅ Ideal para despliegue en producción

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
