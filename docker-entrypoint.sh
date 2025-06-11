#!/bin/sh

# Verificar si estamos en desarrollo
if [ "$NODE_ENV" = "development" ]; then
  # Esperar a que MongoDB esté disponible
  echo "Esperando a que MongoDB esté disponible..."
  while ! nc -z mongodb 27017; do
    sleep 1
  done
  echo "MongoDB está disponible"
fi

# Ejecutar los seeders solo en desarrollo
if [ "$NODE_ENV" = "development" ]; then
  echo "Ejecutando seeders..."
  cd /app && node dist/database/seeds/run-seed.js
fi

# Iniciar la aplicación
echo "Iniciando la aplicación..."
npm run start:prod 