import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Columns } from './columns.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Columns)
        private readonly columnRepository: Repository<Columns>,
        private readonly usersService: UsersService,
    ) { }

    // Метод для получения пользователя
    async getUser(id_column: number): Promise<Users> {
        const column = await this.getOne(id_column)
        return column.fk_user
    }

    // Метод для поиска колонки по ID
    async getOne(id_column: number): Promise<Columns | undefined> {
        return await this.columnRepository.findOne({ where: { id_column } });
    }

    // Метод для создания новой колонки
    async create(id_user: number, columnData: Partial<Columns>): Promise<Columns> {

        const user = await this.usersService.getOne(id_user);
        if (!user) {
            throw new Error('Пользователь не найден');
        }

        columnData.fk_user = user;
        const column = this.columnRepository.create(columnData);
        return await this.columnRepository.save(column);
    }

    // Метод для обновления колонки
    async update(id_column: number, columnData: Partial<Columns>): Promise<Columns> {
        await this.columnRepository.update(id_column, columnData);
        return this.getOne(id_column);
    }

    // Метод для удаления колонки
    async remove(id_column: number): Promise<boolean> {
        if (await this.getOne(id_column)) {
            await this.columnRepository.delete(id_column);
            return true;
        } else {
            return false;
        }

    }

}
