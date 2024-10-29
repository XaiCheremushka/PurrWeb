import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ColumnsDto {
    @ApiProperty({ example: 'Tests', description: 'Название колонки', maxLength: 20 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Название столбца не должено превышать 20 символов' })
    title: string;
}
