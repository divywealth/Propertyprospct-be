import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserAddressDto } from './../../user-address/dto/update-user-address.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: '+234902998928', description: 'User Phone number' })
  phoneNo: string;

  @ApiProperty({ example: '+234902998928', description: 'User WhatsApp number'})
  whatsappNo: string;

  @ApiProperty({
    type: UpdateUserAddressDto,
    description: 'Your address information',
    required: false,
  })
  address: UpdateUserAddressDto;
}
