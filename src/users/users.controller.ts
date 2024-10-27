import { Controller, Get, Body, Post } from '@nestjs/common';
import { UsersDto } from './users.dto/users.dto';

@Controller('users')
export class UsersController {
    id: number
    email: string
    password: string

    constructor() {
        this.email = "vania@armenia.ru"
        this.password = "asdasd55"
    }

    @Post()
    async create(@Body() dto: UsersDto) {
        this.email = dto.email
        this.password = dto.password

        return {
            "email": this.email,
            "password": this.password
        }
    }

    @Get(':id')
    async read() {
        return {
            "email": this.email,
            "password": this.password
        }
    }

    // Допилить 
    @Post(":id")
    async update(@Body() dto: UsersDto) {
        this.email = dto.email
        this.password = dto.password

        return {
            "email": this.email,
            "password": this.password
        }
    }

    @Get(":id/delete")
    async delete() {
        return {
            "message": "Success delete user"
        }
    }
}
