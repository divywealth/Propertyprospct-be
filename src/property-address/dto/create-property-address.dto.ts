import { IsNotEmpty } from 'class-validator';

export class CreatePropertyAddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  locality: string;

  @IsNotEmpty()
  state: string;
}
