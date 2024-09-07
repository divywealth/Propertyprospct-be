import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

export enum ACCOUNTTYPE {
  AGENT = 'Agent',
  PROPERTYOWNER = 'Property Owner',
  ESTATECOMPANY = 'Estate Company',
}

export enum STATUS {
  VERIFIED = 'Verified',
  NOTVERIFIED = 'Not Verified',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: ACCOUNTTYPE, required: true })
  accountType: ACCOUNTTYPE;

  @Prop({ default: null })
  phoneNo: string;

  @Prop({ default: null })
  whatsappNo: string;

  @Prop({ type: String, enum: STATUS, default: STATUS.NOTVERIFIED })
  status: STATUS;

  @Prop({ required: true })
  password: string;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre<UserDocument>('save', async function (next) {
  if(!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.virtual('address', {
  ref: 'UserAddress',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
