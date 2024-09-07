import { ApiOperation, ApiHeader, ApiResponse, ApiBody } from '@nestjs/swagger';
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

  @Post('auth/verify-code')
  @ApiOperation({ summary: "verify code sent to email"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiBody({ schema: { type: 'object', properties: { code: { type: 'string', example: '435837'}} } })
  @ApiResponse({ status: 201, description: 'Existing code and successful message' })
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

  @Post('auth/forget-password/send-code')
  @ApiOperation({ summary: "create code for forget password"})
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string', example: 'john12@gmail.com'}} } })
  @ApiResponse({ status: 201, description: 'Created code instance' })
  async forgetPasswordCode(@Body('email') email: string) {
    try {
      return this.codeService.createCodeForPassword(email);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('auth/register/sendcode')
  @ApiOperation({ summary: "create code for verifyUser"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string', example: 'john12@gmail.com'}} } })
  @ApiResponse({ status: 201, description: 'Created code instance' })
  async verifyUserCode(
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
