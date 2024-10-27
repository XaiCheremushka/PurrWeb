import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class UsersDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Некорректный формат email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
    @MaxLength(20, { message: 'Пароль не должен превышать 20 символов' })
    password: string;
}
