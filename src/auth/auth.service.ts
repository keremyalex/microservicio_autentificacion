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
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
  }

  async register(email: string, password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashed, role: Role.VENDEDOR });

    return this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
  }
}
