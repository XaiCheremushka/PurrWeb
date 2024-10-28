import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CardsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Название каточки не должено превышать 20 символов' })
    name: string
}
