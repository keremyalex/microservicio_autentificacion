import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../user/entity/user.entity';
import { UserSeeder } from './users.seed';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/ferreteria'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommandModule,
  ],
  providers: [UserSeeder],
  exports: [UserSeeder],
})
export class SeedModule {} 