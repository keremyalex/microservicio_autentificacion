#!/bin/sh

# Esperar a que MongoDB esté disponible
echo "Esperando a que MongoDB esté disponible..."
while ! nc -z mongodb 27017; do
  sleep 1
done
echo "MongoDB está disponible"

# Ejecutar los seeders
echo "Ejecutando seeders..."
cd /app && node dist/database/seeds/run-seed.js

# Iniciar la aplicación
echo "Iniciando la aplicación..."
npm run start:prod 