import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeModule } from './code/code.module';
import { UserAddressModule } from './user-address/user-address.module';
import { PropertyModule } from './property/property.module';
import { PropertyImageModule } from './property-image/property-image.module';
import { PropertyAddressModule } from './property-address/property-address.module';
import { CloudinaryModule } from './services/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthenticationModule,
    UserModule,
    CodeModule,
    UserAddressModule,
    PropertyModule,
    PropertyImageModule,
    PropertyAddressModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
