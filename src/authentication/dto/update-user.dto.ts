import { CreateUserAddressDto } from 'src/user-address/dto/create-user-address.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { UpdateUserAddressDto } from './../../user-address/dto/update-user-address.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


@ApiExtraModels(CreateUserDto)
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: '+234902998928', description: 'User Phone number' })
  phoneNo: string;

  @ApiProperty({
    example: '+234902998928',
    description: 'User WhatsApp number',
  })
  whatsappNo: string;

  @ApiProperty({
    type: CreateUserAddressDto,
    example: {
      street: '123 Main St',
      locality: 'Downtown',
      state: 'Lagos',
      country: 'Nigeria',
    },
    description: 'Your address information',
    required: false,
  })
  address: CreateUserAddressDto;
}
