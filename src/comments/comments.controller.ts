import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsDto } from './comments.dto/comments.dto';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiResponse({ status: 201, description: 'Комментарий создан' })
    @ApiResponse({ status: 404, description: 'Карточка не найдена' })
    async create(@Param("cardId") id_card: number, @Body() dto: CommentsDto) {
        return await this.commentsService.create(id_card, dto)
    }

    @Get(":id")
    @ApiOperation({ summary: 'Получить комментарий' })
    @ApiResponse({ status: 200, description: 'Комментарий получен' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    async read(@Param("id") id_comment: number) {
        return await this.commentsService.getOne(id_comment)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Обновить комментарий' })
    @ApiResponse({ status: 200, description: 'Комментарий обновлен' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async update(@Param("id") id_comment: number, @Body() dto: CommentsDto) {
        await this.commentsService.update(id_comment, dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить комментарий' })
    @ApiResponse({ status: 200, description: 'Комментарий удален' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    @ApiResponse({ status: 401, description: 'Вы не авторизированы' })
    async delete(@Param("id") id_comment: number) {
        if (await this.commentsService.remove(id_comment)) {
            return { "message": "Success delete!" }
        } else {
            return { "message": "Comment not found" }
        }
    }
}
