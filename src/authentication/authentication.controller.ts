import { UserService } from './../user/user.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-pasword.dto';

@Controller({
  version: '1'
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private readonly userService: UserService
    ) {}

  @Post('user')
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    try {
      return this.authenticationService.create(createAuthenticationDto);
    } catch (error) {
      throw error.message
    }
  }

  @Post('login')
  login(@Body() loginuserDto: LoginUserDto) {
    try {
      return this.authenticationService.login(loginuserDto)
    } catch (error) {
      throw error.message
    }
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    try {
      return this.authenticationService.remove(id);
    } catch (error) {
      throw error.message
    }
  }

  @Put('reset-password')
  @UsePipes(ValidationPipe)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto)
    } catch (error) {
      throw error.message
    }
  }

  @Put('update-password')
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updatePassword(updatePasswordDto, existingUser)
    } catch (error) {
      throw error.message
    }
  }
  
  @Put('update-email')
  async updateEmail(@Req() request: Request, @Body('email') email: string) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updateEmail(email, existingUser)
    } catch (error) {
      throw error.message
    }
  }

  @Patch('verify-user')
  async verifyUser(@Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.verifyUser(existingUser)
    } catch (error) {
      throw error.message
    }
  }
}
