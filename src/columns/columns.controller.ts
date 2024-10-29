import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ColumnsDto } from './columns.dto/columns.dto';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnsController {

    constructor(private readonly columnsService: ColumnsService) { }

    @Post()
    @ApiOperation({ summary: 'Создать колонку' })
    @ApiResponse({ status: 201, description: 'Колонка создана' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async create(@Param("userId") id_user: number, @Body() dto: ColumnsDto) {
        return await this.columnsService.create(id_user, dto);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Получить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка получена' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    async read(@Param("id") id_column: number) {
        return await this.columnsService.getOne(id_column);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Обновить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка обновлена' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async update(@Param("id") id_column: number, @Body() dto: ColumnsDto) {
        return await this.columnsService.update(id_column, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка удалена' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async delete(@Param("id") id_column: number) {
        if (await this.columnsService.remove(id_column)) {
            return { "message": "Success delete!" }
        } else {
            return { "message": "Column not found" }
        }
    }
}
