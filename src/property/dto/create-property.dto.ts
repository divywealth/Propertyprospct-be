import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserAddressDto } from 'src/user-address/dto/create-user-address.dto';
import {
  Category,
  PaymentType,
  Status,
  Type,
} from '../entities/property-enums';
import { Express } from 'express';
import { Multer } from 'multer';

export class CreatePropertyDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of property', required: true})
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'category', required: true, enum: Category})
  category: Category;

  @IsNotEmpty()
  @ApiProperty({ description: 'type of property', required: true, enum: Type})
  type: Type;

  @IsNotEmpty()
  @ApiProperty({ description: 'market status', required: true, enum: Status})
  marketStatus: Status;

  @IsNotEmpty()
  @ApiProperty({ description: 'price', required: true})
  price: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'currency if naira or dollar', required: true})
  paymentType: PaymentType;

  @ApiProperty({ description: 'total number of bedrooms', })
  noOfBedrooms: number;

  @ApiProperty({ description: 'total number of toilets', })
  toilets: number;

  @ApiProperty({ description: 'total number of parking space', })
  parking: number;

  @ApiProperty({ description: 'total area for lands', })
  totalArea: number;

  @ApiProperty({ description: 'covered area for land', })
  coveredArea: number;

  @ApiProperty({ description: 'if furnished', })
  isFurnished: boolean;

  @ApiProperty({ description: 'if serviced', })
  isServiced: boolean;

  @ApiProperty({ description: 'if shared toilets or bathroom', })
  isShared: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'description of the property',
    required: true,
  })
  Description: string;

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
    required: true,
  })
  state: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Array of files to be uploaded',
  })
  files: Express.Multer.File[];
}