import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  ADMIN = 'admin',
}

@Schema()
export class Auth {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
