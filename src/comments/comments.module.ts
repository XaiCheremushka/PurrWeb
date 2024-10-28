import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { Comments } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), CardsModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
