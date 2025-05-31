import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...rest } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('ID de usuario inválido');
    }

    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Formato de ID inválido');
      }
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...rest } = updateUserInput;

    if (!id || typeof id !== 'string') {
      throw new BadRequestException('ID de usuario inválido');
    }

    // Si hay contraseña, hashearla antes de actualizar
    if (rest.password) {
      rest.password = await bcrypt.hash(rest.password, 10);
    }

    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, rest, { new: true, runValidators: true })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return updatedUser;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Formato de ID inválido');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos de actualización inválidos');
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }


  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
