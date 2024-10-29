import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsDto } from './comments.dto/comments.dto';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    async create(@Param("cardId") id_card: number, @Body() dto: CommentsDto) {
        return await this.commentsService.create(id_card, dto)
    }

    @Get(":id")
    async read(@Param("id") id_comment: number) {
        return await this.commentsService.getOne(id_comment)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async update(@Param("id") id_comment: number, @Body() dto: CommentsDto) {
        await this.commentsService.update(id_comment, dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async delete(@Param("id") id_comment: number) {
        if (await this.commentsService.remove(id_comment)) {
            return { "message": "Success delete!" }
        } else {
            return { "message": "Comment not found" }
        }
    }
}
