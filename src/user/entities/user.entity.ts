import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

export enum ACCOUNTTYPE {
    AGENT = "Agent",
    PROPERTYOWNER = "Property Owner",
    ESTATECOMPANY = "Estate Company",
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ type: String, enum: ACCOUNTTYPE, required: true})
  accountType: ACCOUNTTYPE;

  @Prop({ required: true })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User)

