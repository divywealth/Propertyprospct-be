import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { UserAddress, UserAdrressSchema } from './entities/user-address.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAddress.name, schema: UserAdrressSchema}
    ])
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService]
})
export class UserAddressModule {}
