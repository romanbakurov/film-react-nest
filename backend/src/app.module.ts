import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmsSchema } from './films/schemas/films.schema';
import { FilmsController } from './films/controller/films.controller';
import { FilmsRepository } from './repository/films.repository';
import { FilmsService } from './films/service/films.service';
import { OrderController } from './order/controlerr/order.controller';
import { OrderService } from './order/service/order.service';
import { Order, OrderSchema } from './order/schemas/order.schema';

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
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmsSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, FilmsRepository, OrderService],
})
export class AppModule {}
