import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Code } from './entities/code.entity';
import { User } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/services/NotificationService';
import { BadRequest } from 'src/services/BadRequestResponse';
import { randomNumber } from 'src/services/randomNumber';

@Injectable()
export class CodeService {

  constructor (
    @InjectModel(Code.name)
    private readonly codeModel: mongoose.Model<Code>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    private readonly notificationService: NotificationService
  ) {}

  async verifyCode (code: string, user: User) {
    try {
      const existingCode = await this.codeModel.findOne({
        user: user._id,
        code: code
      })
      if(!existingCode) {
        throw BadRequest('invalid code')
      }
      return 'Code correct'
    } catch (error) {
      throw error.message
    }
  } 

  async createCodeForPassword(email: string) {
    try {
      const existingUser = await this.userModel.findOne({email: email})
      if (!existingUser) {
        throw BadRequest("email dosen't have an account")
      }
      const existingUserCode =  await this.codeModel.findOne({user: existingUser._id})
      if(existingUserCode) {
        await this.codeModel.deleteOne({_id: existingUserCode._id})
      }
      const code = randomNumber(6);
      const createdCode = new this.codeModel({
        user: existingUser._id,
        code: code
      })
      const emailPayload = {
        to: email,
        subject: 'Slang Reset Password',
        from: 'christianonuora1@gmail.com',
        text: 'Hello World from Slang.com',
        html: `<h1>Hello your verification code is ${code}</h1>`,
      };
      await this.notificationService.emailNotificationService(emailPayload)
      return await createdCode.save()
    } catch (error) {
      throw error.message
    }
  }

  async createCodeForEmail(email: string, user: User) {
    try {
      console.log(email)
      const code = randomNumber(6);
      const existingUserCode =  await this.codeModel.findOne({user: user._id})
      if (existingUserCode) {
        await this.codeModel.deleteOne({_id: existingUserCode._id})
      }
      const createdCode = new this.codeModel({
        user: user._id,
        code: code
      })
      const emailPayload = {
        to: email,
        subject: 'Slang Reset Password',
        from: 'christianonuora1@gmail.com',
        text: 'Slang.com',
        html: `<h1>Hello your verification code is ${code}</h1>`,
      };
      console.log(emailPayload)
      const sentEmail = await this.notificationService.emailNotificationService(emailPayload)
      console.log(sentEmail)
      return await createdCode.save()

    } catch (error) {
      throw error.message
    }
  }
  // create(createCodeDto: CreateCodeDto) {
  //   return 'This action adds a new code';
  // }

  // findAll() {
  //   return `This action returns all code`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} code`;
  // }

  // update(id: number, updateCodeDto: UpdateCodeDto) {
  //   return `This action updates a #${id} code`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} code`;
  // }
}