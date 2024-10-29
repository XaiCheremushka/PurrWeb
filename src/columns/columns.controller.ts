import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ColumnsDto } from './columns.dto/columns.dto';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:userId/columns')
export class ColumnsController {

    constructor(private readonly columnsService: ColumnsService) { }

    @Post()
    async create(@Param("userId") id_user: number, @Body() dto: ColumnsDto) {
        return await this.columnsService.create(id_user, dto);
    }

    @Get(":id")
    async read(@Param("id") id_column: number) {
        return await this.columnsService.getOne(id_column);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async update(@Param("id") id_column: number, @Body() dto: ColumnsDto, @Req() req) {
        const user = await this.columnsService.getUser(id_column);
        if (req.user.id_user == user.id_user) {
            return await this.columnsService.update(id_column, dto);
        } else {
            return { "Message": "Access is denied" }
        }

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async delete(@Param("id") id_column: number, @Req() req) {
        const user = await this.columnsService.getUser(id_column);
        if (req.user.id_user == user.id_user) {
            if (await this.columnsService.remove(id_column)) {
                return { "message": "Success delete!" }
            } else {
                return { "message": "Column not found" }
            }
        } else {
            return { "Message": "Access is denied" }
        }


    }
}
