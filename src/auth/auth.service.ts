// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Role } from './enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    console.log('Intentando login con email:', email);
    const user = await this.userService.findByEmail(email);
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (!user) {
      console.log('Usuario no encontrado');
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Contraseña coincide:', passwordMatch ? 'Sí' : 'No');

    if (!passwordMatch) {
      console.log('Contraseña no coincide');
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    console.log('Token generado exitosamente');
    return token;
  }

  async register(email: string, password: string): Promise<string> {
    const user = await this.userService.create({ email, password, role: Role.VENDEDOR });
    return this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
  }
}
