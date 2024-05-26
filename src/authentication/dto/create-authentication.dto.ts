import { IsNotEmpty } from 'class-validator';
import { ACCOUNTTYPE } from 'src/user/entities/user.entity';

export class CreateAuthenticationDto {

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  accountType: ACCOUNTTYPE;

  @IsNotEmpty()
  password: string;
}