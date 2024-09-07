import { Module } from '@nestjs/common';
import { PropertyImageService } from './property-image.service';
import { PropertyImageController } from './property-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyImage, PropertyImageSchema } from './entities/property-image.entity';
import { PropertyService } from 'src/property/property.service';
import { Property, PropertySchema } from 'src/property/entities/property.entity';
import { PropertyAddressService } from 'src/property-address/property-address.service';
import { CloudinaryService } from 'src/services/cloudinary';
import { PropertyAddress, PropertyAddressSchema } from 'src/property-address/entities/property-address.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyImage.name, schema: PropertyImageSchema},
      { name: Property.name, schema: PropertySchema},
      { name: PropertyAddress.name, schema: PropertyAddressSchema }
    ])
  ],
  controllers: [PropertyImageController],
  providers: [PropertyImageService, PropertyService, PropertyAddressService, CloudinaryService]
})
export class PropertyImageModule {}
