import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1'
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
    ) {}

  @Get('users')
  findAll() {
    try {
      return this.userService.findAll()
    } catch (error) {
      throw error.message
    }
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('api/user/update') 
  async updateUser(@Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw error
    }
  }
}
