import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './films/schemas/film.schema';
import { FilmsController } from './films/controller/films.controller';
import { FilmsRepository } from './repository/films.repository';
import { FilmsService } from './films/service/films.service';

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
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [configProvider, FilmsService, FilmsRepository],
})
export class AppModule {}
