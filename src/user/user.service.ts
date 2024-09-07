import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Request400 } from 'src/Util/StatusResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userModel
        .find()
        .select('-password')
        .populate('address')
        .exec();
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const existingUser: User = await this.userModel
        .findById(id)
        .populate('address')
        .select('-password')
        .exec();
      if (!existingUser) {
        return Request400("user dosen't exist");
      }
      return existingUser;
    } catch (error) {
      throw error.message;
    }
  }

  async updateUser() {}
}
