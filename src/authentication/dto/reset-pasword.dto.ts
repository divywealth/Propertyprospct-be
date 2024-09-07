import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ example: "iloveyou1234", description: "Your password"})
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: "iloveyou1234", description: "Your password"})
  newPassword: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @ApiProperty({ example: "johnobo12@gmail.com", description: "Your email"})
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: "iloveyou1234", description: "Your password"})
    password: string
}
