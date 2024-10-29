import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class UsersDto {
    @ApiProperty({ example: 'ex@example.com', description: 'Email пользователя' })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Некорректный формат email' })
    email?: string;

    @ApiProperty({ example: 'Password123!', description: 'Пароль пользователя', minLength: 8, maxLength: 20 })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
    @MaxLength(20, { message: 'Пароль не должен превышать 20 символов' })
    password?: string;
}


