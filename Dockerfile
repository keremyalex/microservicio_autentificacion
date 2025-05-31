# Etapa de construcción
FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:20.11.1-alpine

WORKDIR /app

# Instalar netcat
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database/seeds ./src/database/seeds

EXPOSE 3001

# Script para ejecutar seeders y luego la aplicación
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"] 