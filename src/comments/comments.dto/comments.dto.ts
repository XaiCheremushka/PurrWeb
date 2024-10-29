import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CommentsDto {
    @ApiProperty({ example: 'Create test for check updating', description: 'Текст комментария', maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: "Максимальная длина комментария - 100" })
    text: string
}
