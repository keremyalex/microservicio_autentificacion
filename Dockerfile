# Etapa de construcción
FROM node:20.11.1-alpine as builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Etapa de producción
FROM node:20.11.1-alpine as stage-1

# Instalar netcat y otras utilidades necesarias
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Copiar node_modules y dist desde la etapa de construcción
RUN npm install --legacy-peer-deps --production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database/seeds ./src/database/seeds
COPY .env ./

EXPOSE ${PORT}

# Script para ejecutar seeders y luego la aplicación
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"] 