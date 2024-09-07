import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Property } from 'src/property/entities/property.entity';

export type PropertyAddressDocument = HydratedDocument<PropertyAddress>;

@Schema({ timestamps: true })
export class PropertyAddress {
  @Prop({ auto: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;
  
  @Prop({ required: true})
  street: string;

  @Prop({ required: true})
  locality: string;

  @Prop({ required: true})
  state: string
}

export const PropertyAddressSchema = SchemaFactory.createForClass(PropertyAddress);
