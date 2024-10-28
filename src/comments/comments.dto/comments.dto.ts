import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CommentsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: "Максимальная длина комментария - 100" })
    text: string
}
