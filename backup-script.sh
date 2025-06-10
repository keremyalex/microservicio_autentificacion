#!/bin/sh

# Crear directorio de backup con la fecha actual
BACKUP_DIR="/backup/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# Realizar el backup
mongodump --host mongodb --port 27017 --db ferreteria --out "$BACKUP_DIR"

# Comprimir el backup
cd /backup
tar -czf "$BACKUP_DIR.tar.gz" "$(date +%Y-%m-%d)"

# Eliminar el directorio sin comprimir
rm -rf "$BACKUP_DIR"

# Mantener solo los últimos 7 días de backups
find /backup -name "*.tar.gz" -mtime +7 -delete 