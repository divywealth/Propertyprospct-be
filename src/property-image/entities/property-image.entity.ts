import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Property } from 'src/property/entities/property.entity';

export type PropertyImageDocument = HydratedDocument<PropertyImage>;

@Schema({ timestamps: true })
export class PropertyImage {
    @Prop({ auto: true, type: mongoose.Schema.Types.ObjectId})
    _id: string

    @Prop({ required: true})
    url: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true})
    property: Property;
}

export const PropertyImageSchema = SchemaFactory.createForClass(PropertyImage)
