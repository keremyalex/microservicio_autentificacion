import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

@ObjectType()
@Schema()
@Directive('@key(fields: "_id")')
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => ID, { name: 'id' })
  get id(): string {
    return this._id;
  }

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => Role)
  @Prop({ type: String, enum: Role, default: Role.VENDEDOR })
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
