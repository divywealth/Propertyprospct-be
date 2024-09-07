import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";


export class LoginUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: "john12@gmail.com", description: "Your username"})
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: "iloveyou1234", description: "Your password"})
    password: string
}