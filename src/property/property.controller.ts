import { FileUploadDto } from './dto/file-upload.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnAuthorized401 } from 'src/Util/StatusResponse';

@Controller({
  version: '1',
})
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('create-property')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePropertyDto })
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: "Create property"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Created property' })
  @UsePipes(ValidationPipe)
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Req() request: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const user = request.user
      console.log(user)
      const propertyDto: CreatePropertyDto = {
        ...createPropertyDto,
        files: files,
      };
      console.log(propertyDto);
      return this.propertyService.create(propertyDto, user);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('properties')
  @ApiOperation({ summary: "Get properties"})
  @ApiResponse({ status: 201, description: 'All property instances' })
  findAll() {
    try {
      return this.propertyService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @Get('property/:id')
  @ApiOperation({ summary: "Get property"})
  @ApiResponse({ status: 201, description: 'Property instance' })
  findOne(@Param('id') id: string) {
    try {
      return this.propertyService.findOne(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch(':userId/property/:propertyId')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "Update property"})
  @ApiBody({ type: UpdatePropertyDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  updateUserProperty(
    @Param('userId') userId: string,
    @Param("propertyId") propertyId: string,
    @Req() request: Request,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    const user = request.user;
    if (user._id !== userId) {
      return UnAuthorized401("You are not allowed to delete property")
    }
    return this.propertyService.update(+userId, updatePropertyDto);
  }

  

  @Delete(':userId/properties/:propertyId')
  @ApiOperation({ summary: "Delete property"})
  @ApiOperation({ summary: "Delete property"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'deleted property' })
  deleteUserProperty(
    @Param('userId') userId: string,
    @Param('propertyId') propertyId: string,
    @Req() request: Request
  ) {
    try {
      const user = request.user;
      if (user._id !== userId) {
        return UnAuthorized401("You are not allowed to delete property")
      }
      return this.propertyService.deleteUserProperty(userId, propertyId);
    } catch (error) {
      throw error;
    }
  }


}
