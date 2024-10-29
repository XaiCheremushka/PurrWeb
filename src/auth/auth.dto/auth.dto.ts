import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @ApiProperty({ example: 'ex@example.com', description: 'Email пользователя' })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Некорректный формат email' })
    email: string

    @ApiProperty({ example: 'Password123!', description: 'Пароль пользователя' })
    @IsNotEmpty()
    @IsString()
    password: string
}
