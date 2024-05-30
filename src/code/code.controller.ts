import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Controller({
  version: '1'
})
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('verify-code')
  async verifyCode(@Body('code') code: string, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userToken = decodedToken.user._id;
      const user = await this.userService.findOne(userToken);
      return this.codeService.verifyCode(code, user);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('password-code')
  async createCodeForPassword(@Body('email') email: string) {
    try {
      return this.codeService.createCodeForPassword(email);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('email-code')
  async createCodeForEmail(
    @Body('email') email: string,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userToken = decodedToken.user._id;
      const user = await this.userService.findOne(userToken);
      return this.codeService.createCodeForEmail(email, user);
    } catch (error) {
      throw error.message;
    }
  }

  // @Post()
  // create(@Body() createCodeDto: CreateCodeDto) {
  //   return this.codeService.create(createCodeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.codeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.codeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
  //   return this.codeService.update(+id, updateCodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.codeService.remove(+id);
  // }
}
