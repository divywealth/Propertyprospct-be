import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ACCOUNTTYPE } from 'src/user/entities/user.entity';

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty({ example: "john12@gmail.com", description: "Your username"})
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "John obogai", description: "Your full name"})
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Agent", description: "Account Type", enum: ACCOUNTTYPE})
  accountType: ACCOUNTTYPE;

  @IsNotEmpty()
  @ApiProperty({ example: "iloveyou1234", description: "Your password"})
  password: string;
}