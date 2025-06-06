// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Context, ResolveReference } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'me' })
  me(@Context() context) {
    const user = context.req.user;
    return this.userService.findOne(user.userId);
  }

  @Query(() => [User])
  @Roles(Role.ADMIN)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  @Roles(Role.ADMIN)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => Boolean)
  @Roles(Role.ADMIN)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.userService.findOne(reference.id);
  }
}
