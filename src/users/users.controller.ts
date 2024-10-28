import { Controller, Get, Body, Post, Delete, Param, Put } from '@nestjs/common';
import { UsersDto } from './users.dto/users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() dto: UsersDto) {
        return await this.usersService.create(dto);
    }

    @Get(':id')
    async read(@Param('id') id: number): Promise<Users> {
        return await this.usersService.getOne(id);
    }

    // Допилить 
    @Put(":id")
    async update(@Param('id') id: number, @Body() dto: UsersDto) {
        return await this.usersService.update(id, dto)
    }

    @Delete(":id")
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
