import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    // Метод для поиска пользователя по ID
    async getOne(id_user: number): Promise<Users | undefined> {
        return await this.userRepository.findOne({ where: { id_user } });
    }

    // Метод для создания нового пользователя
    async create(userData: Partial<Users>): Promise<Users> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    // Метод для обновления пользователя
    async update(id: number, userData: Partial<Users>): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { id_user: id } })
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        await this.userRepository.update(id, userData);
        return this.getOne(id);
    }

    // Метод для удаления пользователя
    async remove(id: number): Promise<boolean> {
        if (await this.getOne(id)) {
            await this.userRepository.delete(id);
            return true
        } else {
            return false
        }

    }

}
