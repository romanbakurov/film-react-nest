import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { appConfig, configProvider } from './app.config.provider';
import { FilmsController } from './films/controller/films.controller';
import { FilmsRepository } from './films.repository/films.repository';
import { FilmsService } from './films/service/films.service';
import { OrderController } from './order/controlerr/order.controller';
import { OrderService } from './order/service/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './films/entities/Films.entity';
import { ScheduleEntity } from './films/entities/Schedule.entity';
import { OrdersRepository } from './orders.repository/orders.repository';
import { OrdersEntity } from './order/entities/Orders.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: appConfig.DATABASE_HOST,
      port: +appConfig.DATABASE_PORT,
      username: appConfig.DATABASE_USERNAME,
      password: appConfig.DATABASE_PASSWORD,
      database: appConfig.DATABASE_NAME,
      entities: [FilmsEntity, ScheduleEntity, OrdersEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([FilmsEntity, ScheduleEntity, OrdersEntity]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    FilmsRepository,
    OrderService,
    OrdersRepository,
  ],
})
export class AppModule {}
