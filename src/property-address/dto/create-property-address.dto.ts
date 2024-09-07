import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePropertyAddressDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'street property located',
    required: true,
  })
  street: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'locality of property',
    required: true,
  })
  locality: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Calaber',
    description: 'State property located',
  })
  state: string;
}
