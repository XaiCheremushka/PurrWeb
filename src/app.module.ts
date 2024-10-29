import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ColumnsModule } from './columns/columns.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// import * as dotenv from 'dotenv';

// dotenv.config();



@Module({
  imports: [UsersModule, CardsModule, CommentsModule, ColumnsModule, AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_USER_PASSWORD,
      database: 'purrweb',
      autoLoadEntities: true, // Автоматически загружает все сущности
      synchronize: true, // Включает автоматическую синхронизацию моделей с таблицами
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

