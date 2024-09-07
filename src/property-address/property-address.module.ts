import { Module } from '@nestjs/common';
import { PropertyAddressService } from './property-address.service';
import { PropertyAddressController } from './property-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyAddress, PropertyAddressSchema } from './entities/property-address.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyAddress.name, schema: PropertyAddressSchema}
    ])
  ],
  controllers: [PropertyAddressController],
  providers: [PropertyAddressService]
})
export class PropertyAddressModule {}
