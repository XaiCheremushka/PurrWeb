import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private readonly commentRepository: Repository<Comments>,
        private readonly cardService: CardsService,
    ) { }

    // Метод для получения пользователя
    async getUser(id_comment: number): Promise<Users> {
        const comment = await this.getOne(id_comment);
        return comment.fk_card.fk_column.fk_user
    }

    // Метод для поиска комментария по ID
    async getOne(id_comment: number): Promise<Comments | undefined> {
        return await this.commentRepository.findOne({ where: { id_comment } });
    }

    // Метод для создания нового комментария
    async create(id_card: number, cardData: Partial<Comments>): Promise<Comments> {
        const card = await this.cardService.getOne(id_card);
        if (!card) {
            throw new Error('Колонка не найдена');
        }

        cardData.fk_card = card;
        const comment = this.commentRepository.create(cardData);
        return await this.commentRepository.save(comment);
    }

    // Метод для обновления комментария
    async update(id_comment: number, cardData: Partial<Comments>): Promise<Comments> {
        await this.commentRepository.update(id_comment, cardData);
        return this.getOne(id_comment);
    }

    // Метод для удаления комментария
    async remove(id_comment: number): Promise<boolean> {
        if (await this.getOne(id_comment)) {
            await this.commentRepository.delete(id_comment);
            return true
        } else {
            return false
        }

    }
}
