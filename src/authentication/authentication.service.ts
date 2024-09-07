import { UserDocument } from './../user/entities/user.entity';
import { UserAddress } from './../user-address/entities/user-address.entity';
import { UserAddressService } from './../user-address/user-address.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { BadRequest } from 'src/services/BadRequestResponse';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-pasword.dto';
import { CodeService } from 'src/code/code.service';
import { CreateUserAddressDto } from 'src/user-address/dto/create-user-address.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NOTFOUND404 } from 'src/Util/StatusResponse';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly codeService: CodeService,
    private readonly userAddressService: UserAddressService,
    private readonly userService: UserService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if user exists already
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      return BadRequest('User has an account with this email');
    }
    const newUser = new this.userModel(createUserDto);
    //Create Address Model and Create Address
    const createAddressDto: CreateUserAddressDto = {
      user: newUser._id,
    };
    await this.userAddressService.create(createAddressDto);
    //Create code for email
    await this.codeService.createCodeForEmail(newUser.email, newUser);
    const createdUser = await newUser.save();
    //Get and return user
    const user: User = await this.userService.findOne(createdUser._id);
    return {
      user: user,
      access_token: await this.jwtService.signAsync({ user: user }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    console.log("got here");
    if (!loginUserDto.email || !loginUserDto.password) {
      throw BadRequest('email and password required');
    }
    const existingUser: UserDocument = await this.userModel
      .findOne({
        email: loginUserDto.email,
      })
      .populate('address')
      .exec();
    if (!existingUser) {
      throw BadRequest("email dosen't have an account try signing up");
    }
    console.log(loginUserDto.password, existingUser.password);
    const isPasswordValid: boolean = await existingUser.comparePassword(loginUserDto.password)
    if (!isPasswordValid) {
      throw BadRequest('Wrong Password');
    }
    if (existingUser.status !== 'Verified') {
      throw BadRequest('User has not verified email');
    }
    return {
      user: existingUser,
      access_token: await this.jwtService.sign({ user: existingUser }),
    };
  }

  async verifyUser(user: User) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser.status === 'Not Verified') {
      return await this.userModel.findOneAndUpdate(
        { email: user.email },
        { status: 'Verified' },
        { new: true },
      );
    }
    return BadRequest('User is verified already');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser: User = await this.userModel.findById(id);
    if (!existingUser) {
      return NOTFOUND404('No user with this id');
    }
    if (updateUserDto.address) {
      await this.userAddressService.update(
        existingUser._id,
        updateUserDto.address,
      );
    }
    const updatedUser: User = await this.userModel
      .findByIdAndUpdate(existingUser._id, updateUserDto, { new: true })
      .populate('address')
      .exec();
    return updatedUser;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (!resetPasswordDto.password) {
      return BadRequest('Password is required');
    }
    if (resetPasswordDto.password.length < 5) {
      return BadRequest('Password is too short. Atleast 6 characters required');
    }
    const saltOrRounds = 10;
    const password = await bcrypt.hash(resetPasswordDto.password, saltOrRounds);
    return await this.userModel.findOneAndUpdate(
      { email: resetPasswordDto.email },
      { password: password },
    );
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, user: User) {
    if (!(await bcrypt.compare(updatePasswordDto.password, user.password))) {
      throw BadRequest('Wrong Password');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      saltRounds,
    );
    return this.userModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
      { new: true },
    );
  }

  async updateEmail(email: string, user: User) {
    const updateEmail = await this.userModel.findByIdAndUpdate(
      user._id,
      { email: email },
      { new: true },
    );
    if (updateEmail) {
      return updateEmail;
    }
    throw BadRequest('email not updated');
  }
}
