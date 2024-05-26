import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  findAll() {
    try {
      return this.userService.findAll();
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
}
