import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {
  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: [Address] })
  addresses: Address[];

  @Prop()
  role: string;

  @Prop()
  phoneNo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
