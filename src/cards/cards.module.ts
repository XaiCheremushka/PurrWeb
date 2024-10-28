import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { Columns } from 'src/columns/columns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards, Columns]), ColumnsModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule { }
