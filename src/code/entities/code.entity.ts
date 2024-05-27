import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type CodeDocument = HydratedDocument<Code>;

@Schema({ timestamps: true })
export class Code {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, expires: 600 }) // TTL index to expire documents after 600 seconds (10 minutes)
  createdAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code)
