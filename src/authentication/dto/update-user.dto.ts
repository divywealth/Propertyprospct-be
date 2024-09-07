import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserAddressDto } from './../../user-address/dto/update-user-address.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: UpdateUserAddressDto,
    description: 'Your address information',
    required: false,
  })
  address: UpdateUserAddressDto;
}
