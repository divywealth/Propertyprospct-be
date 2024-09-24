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
  Query,
  UploadedFile,
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
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UnAuthorized401 } from 'src/Util/StatusResponse';
import { PropertySearchDto } from './dto/property-search.dto';

@Controller({
  version: '1',
})
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @ApiConsumes('multipart/form-data')


  @Post('create-property')
  @ApiBody({ type: CreatePropertyDto })
  @UseInterceptors(FilesInterceptor('files'))
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
      const propertyDto: CreatePropertyDto = {
        ...createPropertyDto,
        files: files,
      };
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
    console.log(user)
    if (user._id !== userId) {
      return UnAuthorized401("You are not allowed to update this property")
    }
    return this.propertyService.updateUserProperty(propertyId, user._id, updatePropertyDto);
  }

  @Get(':userId/properties')
  @ApiOperation({ summary: "Get User Properties"})
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  getUserProperties (@Param('userId') userId: string, @Req() request: Request) {
    try {
      const user = request.user
      if (user._id !== userId) {
        return UnAuthorized401("Not allowed to get user properties")
      }
      return this.propertyService.getUserProperties(user._id)
    } catch (error) {
      throw error.message
    }
  }

  @Delete(':userId/properties/:propertyId')
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
        return UnAuthorized401("You are not allowed to delete this property")
      }
      return this.propertyService.deleteUserProperty(userId, propertyId);
    } catch (error) {
      throw error;
    }
  }

  @Get('properties/search')
  @ApiOperation({summary: "Search property"})
  @ApiQuery({ type: PropertySearchDto})
  @UsePipes(ValidationPipe)
  searchProperty(@Query() searchDto: PropertySearchDto) {
    return this.propertyService.searchProperties(searchDto)
  }

}
