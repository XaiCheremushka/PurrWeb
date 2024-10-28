import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ColumnsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Название столбца не должено превышать 20 символов' })
    title: string;
}
