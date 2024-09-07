import { IsNotEmpty } from "class-validator";
import { Property } from "src/property/entities/property.entity";

export class CreatePropertyImageDto {
    @IsNotEmpty()
    url: string

    @IsNotEmpty()
    property: Property
}
