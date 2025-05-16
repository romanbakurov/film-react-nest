import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { JoiPipeModule } from 'nestjs-joi';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/controller/films.controller';
import { repositoryProvider } from './app.repository.provider';
import { FilmsService } from './films/service/films.service';
import { OrderController } from './order/controlerr/order.controller';
import { OrderService } from './order/service/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    JoiPipeModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, repositoryProvider, FilmsService, OrderService],
})
export class AppModule {}
