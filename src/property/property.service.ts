import { NOTFOUND404 } from 'src/Util/StatusResponse';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePropertyAddressDto } from 'src/property-address/dto/create-property-address.dto';
import { PropertyAddress } from 'src/property-address/entities/property-address.entity';
import { PropertyAddressService } from 'src/property-address/property-address.service';
import { PropertyImageService } from 'src/property-image/property-image.service';
import { CloudinaryService } from 'src/services/cloudinary';
import { User } from 'src/user/entities/user.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { PropertySearchDto } from './dto/property-search.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<Property>,
    private propertyAddressService: PropertyAddressService,
    private propertyImageService: PropertyImageService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, user: User) {
    const { street, locality, state, files, ...propertyDto } =
      createPropertyDto;

    const address: PropertyAddress = await this.propertyAddressService.create({
      street,
      locality,
      state,
    });

    const property = new this.PropertyModel({
      ...propertyDto,
      address: address,
      user: user,
    });
    await property.save();

    const imageDocument = await Promise.all(
      files.map(async (file) => {
        const uploadImages = await this.cloudinaryService.uploadImage(file);
        console.log(uploadImages);
        const saveImage = await this.propertyImageService.create({
          url: uploadImages.url,
          property: property,
        });
        return saveImage;
      }),
    );
    const imageDocumentsToUnknown = imageDocument as unknown;

    property.images = imageDocumentsToUnknown as mongoose.Schema.Types.ObjectId[];

    await property.save();

    const populatedProperty: Property = await this.PropertyModel.findById(
      property._id,
    )
      .populate('images')
      .populate('user')
      .populate('address')
      .exec();
    console.log(populatedProperty)
    return populatedProperty;
  }

  findAll() {
    return this.PropertyModel.find();
  }

  findOne(id: string) {
    const existingProperty = this.PropertyModel.findById(id);
    if (!existingProperty) {
      return NOTFOUND404('Property not found ');
    }
    return existingProperty;
  }

  updateUserProperty(propertyId: string, userId: string, updatePropertyDto: UpdatePropertyDto) {

    const deleteprp = this.PropertyModel.findOneAndUpdate({_id: propertyId, user: userId}, updatePropertyDto, { new: true })
    return deleteprp;
  }

  getUserProperties(userId: string) {
    const userProperties = this.PropertyModel.find({ user: userId })
    return userProperties;
  }

  deleteUserProperty(userId: string, propertyId: string) {
    const deleteProperty = this.PropertyModel.findOneAndDelete({_id: propertyId, user: userId})
    if (!deleteProperty) {
      return NOTFOUND404('Property not found')
    }
    return deleteProperty;
  }

  async searchProperties(searchDto: PropertySearchDto) {
    const { category, type, maxPrice, minPrice, locality, state} = searchDto
    const filterBy: any = {};

    if (category) filterBy.category = { $regex: category, $options: 'i' }
    if(type) filterBy.type = { $regex: type, $options: 'i' }
    if(maxPrice) filterBy.maxPrice = { $lte: maxPrice };
    if(minPrice) filterBy.maxPrice = { $lte: minPrice };

    const query = this.PropertyModel.find(filterBy).populate('address images user')

    if (locality) {
      query.populate({
        path: 'address',
        match: { locality: { $regex: locality, $options: 'i'}}
      })
    }

    if (state) {
      query.populate({
        path: 'address',
        match: { state: { $regex: state, $options: 'i'}}
      })
    }
    return query.exec()

  }
}
