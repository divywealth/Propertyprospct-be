import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePropertyAddressDto {
  
  @ApiProperty({
    description: 'street property located',
    required: true,
  })
  street: string;

  @ApiProperty({
    description: 'locality of property',
    required: true,
  })
  locality: string;

  @ApiProperty({
    example: 'Calaber',
    description: 'State property located',
  })
  state: string;
}
