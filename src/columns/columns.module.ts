import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './columns.entity';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Columns]), UsersModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService]
})
export class ColumnsModule { }
