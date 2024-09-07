import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type UserAddressDocument = HydratedDocument<UserAddress>;

@Schema({ timestamps: true })
export class UserAddress {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ default: null})
  street: string;

  @Prop({ default: null})
  locality: string;

  @Prop({ default: null})
  state: string;

  @Prop({ default: null})
  country: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  user: User;
}

export const UserAdrressSchema = SchemaFactory.createForClass(UserAddress)
