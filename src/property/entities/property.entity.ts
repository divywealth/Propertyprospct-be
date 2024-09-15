import { User } from './../../user/entities/user.entity';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PropertyAddress } from 'src/property-address/entities/property-address.entity';
import { PropertyImage } from 'src/property-image/entities/property-image.entity';
import { Category, PaymentType, Status, Type } from './property-enums';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property {
  @Prop({ auto: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: Category, required: true })
  category: Category;

  @Prop({ type: String, enum: Type, required: true })
  type: Type;

  @Prop({ type: String, enum: Status, required: true})
  marketStatus: Status;

  @Prop({ required: true })
  minPrice: string;

  @Prop({ required: true })
  maxPrice: string;

  @Prop({ typr: String, enum: PaymentType, required: true})
  paymentType: PaymentType;

  @Prop({ default: null })
  noOfBedrooms: number;

  @Prop({ default: null })
  noOfBathrooms: number;

  @Prop({ default: null })
  noOfToilets: number;

  @Prop({ default: null })
  parking: number;

  @Prop({ default: null })
  totalArea: number;

  @Prop({ default: null })
  coveredArea: number;

  @Prop({ default: false })
  isFurnished: boolean

  @Prop({ default: false})
  isServiced: boolean;

  @Prop({ default: false })
  isShared: boolean

  @Prop({ required: true})
  Description: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyAddress',
    required: true,
  })
  address: PropertyAddress;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyImage' }],
  })
  images: mongoose.Schema.Types.ObjectId[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
