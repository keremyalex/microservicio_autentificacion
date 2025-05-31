import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserSeeder } from './users.seed';

@Injectable()
export class SeedCommand {
  constructor(private readonly userSeeder: UserSeeder) {}

  @Command({
    command: 'seed:users',
    describe: 'Crear usuarios iniciales',
  })
  async createUsers() {
    await this.userSeeder.seed();
  }
} 