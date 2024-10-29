import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CardsDto {
    @ApiProperty({ example: 'Create tests', description: 'Название карточки', maxLength: 20 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Название каточки не должено превышать 20 символов' })
    name: string
}
