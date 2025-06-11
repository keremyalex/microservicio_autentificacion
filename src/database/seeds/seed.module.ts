import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../user/entity/user.entity';
import { UserSeeder } from './users.seed';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://mongodb:27017/ferreteria'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommandModule,
  ],
  providers: [UserSeeder],
  exports: [UserSeeder],
})
export class SeedModule {} 