import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Category, Type } from "../entities/property-enums";


export class PropertySearchDto {
    @IsOptional()
    @IsEnum(Category)
    @ApiProperty({ description: 'category for property', required: false, enum: Category})
    category?: Category;

    @IsOptional()
    @IsEnum(Type)
    @ApiProperty({ description: 'type for property', required: false, enum: Type})
    type?: Type;

    @IsOptional()
    @ApiProperty({ description: 'Maximum price of property', required: false })
    maxPrice?: string;

    @IsOptional()
    @ApiProperty({ description: 'Locality of property', required: false })
    locality?: string;

    @IsOptional()
    @ApiProperty({ description: 'State where the property is located', required: false })
    state?: string;
}