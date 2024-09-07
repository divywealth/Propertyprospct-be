import { IsNotEmpty } from "class-validator";

export class CreateUserAddressDto {

    locality?: string;

    street?: string;

    state?: string;
    
    country?: string;

    @IsNotEmpty()
    user: string;
}
