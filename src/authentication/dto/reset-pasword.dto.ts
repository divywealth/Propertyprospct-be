import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string
}
