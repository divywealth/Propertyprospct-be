import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailPayloadDto {
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  htmlContent: string;
}
