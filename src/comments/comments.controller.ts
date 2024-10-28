import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsDto } from './comments.dto/comments.dto';
import { CommentsService } from './comments.service';

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

    @Put(":id")
    async update(@Param("id") id_comment: number, @Body() dto: CommentsDto) {
        return await this.commentsService.update(id_comment, dto)
    }

    @Delete(":id")
    async delete(@Param("id") id_comment: number) {
        if (await this.commentsService.remove(id_comment)) {
            return {
                "message": "Success delete!"
            }
        } else {
            return {
                "message": "Comment not found"
            }
        }

    }
}
