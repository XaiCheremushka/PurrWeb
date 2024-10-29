import { Controller, Get, Body, Post, Delete, Param, Put } from '@nestjs/common';
import { UsersDto } from './users.dto/users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь создан' })
    async create(@Body() dto: UsersDto) {
        return await this.usersService.create(dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь получен' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async read(@Param('id') id: number): Promise<Users> {
        return await this.usersService.getOne(id);
    }

    @Put(":id")
    @ApiOperation({ summary: 'Обновить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь обновлен' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async update(@Param('id') id: number, @Body() dto: UsersDto) {
        return await this.usersService.update(id, dto)
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь удален' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async delete(@Param('id') id: number) {
        if (await this.usersService.remove(id)) {
            return {
                "message": "Success delete user"
            }
        } else {
            return {
                "message": "User no found"
            }
        }
    }
}
