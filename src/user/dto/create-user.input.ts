// src/user/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../auth/enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role, { defaultValue: Role.VENDEDOR, nullable: true })
  role?: Role;
}
