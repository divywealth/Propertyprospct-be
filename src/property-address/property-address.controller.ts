import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAddressService } from './property-address.service';
import { CreatePropertyAddressDto } from './dto/create-property-address.dto';
import { UpdatePropertyAddressDto } from './dto/update-property-address.dto';

@Controller('property-address')
export class PropertyAddressController {
  constructor(private readonly propertyAddressService: PropertyAddressService) {}

  // @Post()
  // create(@Body() createPropertyAddressDto: CreatePropertyAddressDto) {
  //   return this.propertyAddressService.create(createPropertyAddressDto);
  // }

  // @Get()
  // findAll() {
  //   return this.propertyAddressService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyAddressService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropertyAddressDto: UpdatePropertyAddressDto) {
  //   return this.propertyAddressService.update(+id, updatePropertyAddressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertyAddressService.remove(+id);
  // }
}
