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
  @ApiProperty({ description: 'category', required: true, enum: Category, example: "For Rent"})
  category: Category;

  @IsNotEmpty()
  @ApiProperty({ description: 'type of property', required: true, enum: Type, example: "Flat/Apartment"})
  type: Type;

  @IsNotEmpty()
  @ApiProperty({ description: 'market status', required: true, enum: Status, example: "Available"})
  marketStatus: Status;

  @IsNotEmpty()
  @ApiProperty({ description: 'minimum price', required: true})
  minPrice: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'maximum price', required: true})
  maxPrice: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Per month or Per annum', required: true, enum: PaymentType, example: "Per month"})
  paymentType: PaymentType;

  @ApiProperty({ description: 'total number of bedrooms', required: false,})
  noOfBedrooms: number;

  @ApiProperty({ description: 'total number of bedrooms', required: false,})
  noOfBathrooms: number;

  @ApiProperty({ description: 'total number of toilets', required: false,})
  noOfToilets: number;

  @ApiProperty({ description: 'total number of parking space', required: false,})
  parking: number;

  @ApiProperty({ description: 'total area for lands', required: false, example: 2})
  totalArea: number;

  @ApiProperty({ description: 'covered area for land', required: false, example: 3})
  coveredArea: number;

  @ApiProperty({ description: 'if furnished', required: false, example: true})
  isFurnished: boolean;

  @ApiProperty({ description: 'if serviced', required: false, example: true})
  isServiced: boolean;

  @ApiProperty({ description: 'if shared toilets or bathroom', required: false, example: true})
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
