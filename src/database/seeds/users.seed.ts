import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/entity/user.entity';
import { Role } from '../../auth/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async seed() {
    const count = await this.userModel.countDocuments();
    if (count === 0) {
      const password = await bcrypt.hash('admin123', 10);
      
      // Crear usuario admin
      await this.userModel.create({
        email: 'admin@ferreteria.com',
        password,
        role: Role.ADMIN
      });

      // Crear usuario vendedor de ejemplo
      await this.userModel.create({
        email: 'vendedor@ferreteria.com',
        password: await bcrypt.hash('vendedor123', 10),
        role: Role.VENDEDOR
      });

      // Crear usuario almacenista de ejemplo
      await this.userModel.create({
        email: 'almacen@ferreteria.com',
        password: await bcrypt.hash('almacen123', 10),
        role: Role.ALMACENISTA
      });

      console.log('Usuarios iniciales creados');
    }
  }
} 