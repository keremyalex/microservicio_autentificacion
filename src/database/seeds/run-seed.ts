import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { SeedModule } from './seed.module';
import { UserSeeder } from './users.seed';
import { MongooseModule } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  try {
    const userSeeder = app.get(UserSeeder);
    await userSeeder.seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 