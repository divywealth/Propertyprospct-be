import { PropertyService } from 'src/property/property.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
import { PropertyImage } from './entities/property-image.entity';

@Injectable()
export class PropertyImageService {
  constructor(
    @InjectModel(PropertyImage.name)
    private readonly propertyImageModel: Model<PropertyImage>,
  ) {}

  async create(createPropertyImageDto: CreatePropertyImageDto){
    const newPropertyImage = new this.propertyImageModel(createPropertyImageDto)
    await newPropertyImage.save()
    return newPropertyImage._id
  }

  update(id: number, updatePropertyImageDto: UpdatePropertyImageDto) {
    return `This action updates a #${id} propertyImage`;
  }
  // findAll() {
  //   return `This action returns all propertyImage`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} propertyImage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} propertyImage`;
  // }
}
