import { jwtMiddleware } from './../Util/jwt.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property, PropertySchema } from './entities/property.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PropertyAddress, PropertyAddressSchema } from 'src/property-address/entities/property-address.entity';
import { PropertyImage, PropertyImageSchema } from 'src/property-image/entities/property-image.entity';
import { PropertyAddressService } from 'src/property-address/property-address.service';
import { PropertyImageService } from 'src/property-image/property-image.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/services/cloudinary';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema},
      { name: User.name, schema: UserSchema},
      { name: PropertyAddress.name, schema: PropertyAddressSchema},
      { name: PropertyImage.name, schema: PropertyImageSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, UserService, PropertyImageService, PropertyAddressService, CloudinaryService]
})
export class PropertyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(jwtMiddleware)
    .forRoutes(
      { path: "v1/:userId/properties/:propertyId", method: RequestMethod.DELETE },
      { path: "v1/:userId/property/:propertyId", method: RequestMethod.PATCH },
      { path: "v1/create-property", method: RequestMethod.POST },
      { path: "v1/:userId/properties", method: RequestMethod.GET },
    )
  }
}
