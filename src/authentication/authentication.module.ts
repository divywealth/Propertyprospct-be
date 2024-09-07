import { UserAddress, UserAdrressSchema } from './../user-address/entities/user-address.entity';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CodeService } from 'src/code/code.service';
import { Code, CodeSchema } from 'src/code/entities/code.entity';
import { NotificationService } from 'src/services/NotificationService';
import { UserAddressService } from 'src/user-address/user-address.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Code.name, schema: CodeSchema },
      { name: UserAddress.name, schema: UserAdrressSchema}
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
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, CodeService, NotificationService, UserAddressService],
})
export class AuthenticationModule {}
