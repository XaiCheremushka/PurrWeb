import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CardsDto } from './cards.dto/cards.dto';
import { CardsService } from './cards.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {

    constructor(private readonly cardsService: CardsService) { }

    @Post()
    @ApiOperation({ summary: 'Создать карточку' })
    @ApiResponse({ status: 201, description: 'Карточка создана' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    async create(@Param("columnId") id_column: number, @Body() dto: CardsDto) {
        return await this.cardsService.create(id_column, dto);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Получить карточку' })
    @ApiResponse({ status: 200, description: 'Карточка получена' })
    @ApiResponse({ status: 404, description: 'Карточка не найдена' })
    async read(@Param("id") id_card: number) {
        return await this.cardsService.getOne(id_card);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Обновить карточку' })
    @ApiResponse({ status: 200, description: 'Карточка обновлена' })
    @ApiResponse({ status: 404, description: 'Карточка не найдена' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async update(@Param("id") id_card: number, @Body() dto: CardsDto) {
        return await this.cardsService.update(id_card, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить карточку' })
    @ApiResponse({ status: 200, description: 'Карточка удалена' })
    @ApiResponse({ status: 404, description: 'Карточка не найдена' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async delete(@Param("id") id_card: number) {
        if (await this.cardsService.remove(id_card)) {
            return { "message": "Success delete!" }
        } else {
            return { "message": "Card not found" }
        }
    }
}
