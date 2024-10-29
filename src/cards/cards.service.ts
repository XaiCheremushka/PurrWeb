import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { Repository } from 'typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Cards)
        private readonly cardRepository: Repository<Cards>,
        private readonly columnService: ColumnsService,
    ) { }

    // Метод для получения пользователя
    async getUser(id_card: number): Promise<Users> {
        const card = await this.getOne(id_card);
        return card.fk_column.fk_user
    }

    // Метод для поиска карточки по ID
    async getOne(id_card: number): Promise<Cards | undefined> {
        return await this.cardRepository.findOne({ where: { id_card } });
    }

    // Метод для создания новой карточки
    async create(id_column: number, cardData: Partial<Cards>): Promise<Cards> {
        const column = await this.columnService.getOne(id_column);
        if (!column) {
            throw new Error('Колонка не найдена');
        }

        cardData.fk_column = column;
        const card = this.cardRepository.create(cardData);
        return await this.cardRepository.save(card);
    }

    // Метод для обновления карточки
    async update(id_card: number, cardData: Partial<Cards>): Promise<Cards> {
        await this.cardRepository.update(id_card, cardData);
        return this.getOne(id_card);
    }

    // Метод для удаления карточки
    async remove(id_card: number): Promise<boolean> {
        if (await this.getOne(id_card)) {
            await this.cardRepository.delete(id_card);
            return true
        } else {
            return false
        }

    }
}
