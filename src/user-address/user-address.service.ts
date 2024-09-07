import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequest } from 'src/services/BadRequestResponse';
import { ConflictExeption, NOTFOUND404 } from 'src/Util/StatusResponse';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress.name)
    private readonly userAddressModel: Model<UserAddress>,
  ) {}

  async create(
    createUserAddressDto: CreateUserAddressDto,
  ): Promise<UserAddress> {
    const existingUserAddress: UserAddress =
      await this.userAddressModel.findOne({ user: createUserAddressDto.user });
    if (existingUserAddress) {
      throw ConflictExeption('User has an address already');
    }
    const newAddress = new this.userAddressModel(createUserAddressDto);
    const createdUserAddress = await newAddress.save();
    return createdUserAddress;
  }

  findAll() {
    return this.userAddressModel.find();
  }

  findOne(id: number) {
    const existingUserAddress = this.userAddressModel.findById(id);
    if (!existingUserAddress) {
      return BadRequest('id dosent exist');
    }
    return existingUserAddress;
  }

  async update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    const existingUseraddress: UserAddress = await this.userAddressModel.findOne({ user: id });
    if (!existingUseraddress) {
      return NOTFOUND404("No user address found")
    }
    return this.userAddressModel.updateOne({ user: id }, updateUserAddressDto);
  }

  remove(id: number) {
    return `This action removes a #${id} userAddress`;
  }
}
