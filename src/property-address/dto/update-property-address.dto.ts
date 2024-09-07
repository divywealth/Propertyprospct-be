import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAddressDto } from './create-property-address.dto';

export class UpdatePropertyAddressDto extends PartialType(CreatePropertyAddressDto) {}
