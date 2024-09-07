import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-pasword.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('user')
  @ApiOperation({ summary: "Create new user"})
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User details with token.' })
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authenticationService.create(createUserDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('login')
  @ApiOperation({ summary: "Login user"})
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 201, description: 'User details with token.' })
  @UsePipes(ValidationPipe)
  login(@Body() loginuserDto: LoginUserDto) {
    try {
      console.log("got controller");
      return this.authenticationService.login(loginuserDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('user/update')
  @ApiOperation({ summary: "Update user"})
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 201, description: 'Updated User' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.update(existingUser._id, updateUserDto);
    } catch (error) {
      throw error
    }
  }

  @Delete('user/:id')
  @ApiOperation({ summary: "Delete user"})
  remove(@Param('id') id: string) {
    try {
      return this.authenticationService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Put('reset-password')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: "reset password"})
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 201, description: 'Updated User with password' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Put('update-password')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: "Update password"})
  @ApiBody({ type: UpdatePasswordDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Updated User with password' })
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updatePassword(
        updatePasswordDto,
        existingUser,
      );
    } catch (error) {
      throw error.message;
    }
  }

  @Put('update-email')
  @ApiOperation({ summary: "Update email"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string', example: 'john12@gmail.com'}} } })
  @ApiResponse({ status: 201, description: 'Updated User with email' })
  async updateEmail(@Req() request: Request, @Body('email') email: string) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updateEmail(email, existingUser);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('verify-user')
  @ApiOperation({ summary: "Verify user"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Updated User with verified' })
  async verifyUser(@Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.verifyUser(existingUser);
    } catch (error) {
      throw error.message;
    }
  }
}
