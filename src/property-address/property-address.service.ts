import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyAddressDto } from './dto/create-property-address.dto';
import { UpdatePropertyAddressDto } from './dto/update-property-address.dto';
import { PropertyAddress } from './entities/property-address.entity';

@Injectable()
export class PropertyAddressService {
  constructor (
    @InjectModel(PropertyAddress.name)
    private readonly propertyAddressModel: Model<PropertyAddress>,
  ) {}

  create(createPropertyAddressDto: CreatePropertyAddressDto) {
    const newAddress = new this.propertyAddressModel(createPropertyAddressDto) 
    return newAddress.save()
  }

  update(id: number, updatePropertyAddressDto: UpdatePropertyAddressDto) {
    try {

    } catch(error) {
      throw error
    }
  }

  // findAll() {
  //   try {

  //   } catch(error) {
  //     throw error
  //   }
  // }

  // findOne(id: number) {
  //   try {

  //   } catch(error) {
  //     throw error
  //   }
  // }

  // remove(id: number) {
  //   try {

  //   } catch(error) {
  //     throw error
  //   }
  // }
}
