import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  VENDEDOR = 'vendedor',
  ALMACENISTA = 'almacenista'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Roles disponibles en el sistema',
}); 