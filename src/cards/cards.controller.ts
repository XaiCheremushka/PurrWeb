import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CardsDto } from './cards.dto/cards.dto';
import { CardsService } from './cards.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {

    constructor(private readonly cardsService: CardsService) { }

    @Post()
    async create(@Param("columnId") id_column: number, @Body() dto: CardsDto) {
        return await this.cardsService.create(id_column, dto);
    }

    @Get(":id")
    async read(@Param("id") id_card: number) {
        return await this.cardsService.getOne(id_card);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async update(@Param("id") id_card: number, @Body() dto: CardsDto, @Req() req) {
        const user = await this.cardsService.getUser(id_card);
        if (req.user.id_user == user.id_user) {
            return await this.cardsService.update(id_card, dto);
        } else {
            return { "Message": "Access is denied" }
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async delete(@Param("id") id_card: number, @Req() req) {
        const user = await this.cardsService.getUser(id_card);
        if (req.user.id_user == user.id_user) {
            if (await this.cardsService.remove(id_card)) {
                return { "message": "Success delete!" }
            } else {
                return { "message": "Card not found" }
            }
        } else {
            return { "Message": "Access is denied" }
        }
    }
}
