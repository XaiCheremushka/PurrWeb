import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiResponse({ status: 401, description: 'Неверные данные' })
    @ApiResponse({ status: 201, description: 'Токен успешно получен' })
    @ApiOperation({ summary: 'Получение JWT токена' })
    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

}
