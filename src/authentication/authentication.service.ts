import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { BadRequest } from 'src/services/BadRequestResponse';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-pasword.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {}
  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      if (!loginUserDto.email || !loginUserDto.password) {
        throw BadRequest('email and password required');
      }
      const existingUser = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!existingUser) {
        throw BadRequest("email dosen't have an account try signing up");
      }
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        throw BadRequest('Wrong Password');
      }
      return {
        user: existingUser,
        access_token: this.jwtService.sign({ user: existingUser }),
      };
    } catch (error) {
      throw error.message
    }
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: string) {
    try {
      return this.userModel.findByIdAndDelete(id)
    } catch (error) {
      throw error.message
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      if (!resetPasswordDto.password) {
        return BadRequest('Password is required');
      }
      if (resetPasswordDto.password.length < 5) {
        return BadRequest(
          'Password is too short. Atleast 6 characters required',
        );
      }
      const saltOrRounds = 10;
      const password = await bcrypt.hash(
        resetPasswordDto.password,
        saltOrRounds,
      );
      return await this.userModel.findOneAndUpdate(
        { email: resetPasswordDto.email },
        { password: password },
      );
    } catch (error) {
      throw error.message;
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, user: User) {
    try {
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
    } catch (error) {
      throw error.message;
    }
  }

  async updateEmail(email: string, user: User) {
    try {
      const updateEmail = await this.userModel.findByIdAndUpdate(
        user._id,
        { email: email },
        { new: true },
      );
      if (updateEmail) {
        return updateEmail;
      }
      throw BadRequest('email not updated');
    } catch (error) {
      throw error.message;
    }
  }
}
