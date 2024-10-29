import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Некорректный формат email' })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
