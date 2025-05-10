import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe, LoggerService } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JsonLogger } from './logger/json-logger.service';
import { TskvLogger } from './logger/tskv-logger.service';
import { DevLogger } from './logger/dev-logger.service';

dotenv.config();

async function bootstrap() {
  let logger: LoggerService;

  switch (process.env.LOGGER_TYPE) {
    case 'JSON':
      logger = new JsonLogger();
      break;
    case 'TSKV':
      logger = new TskvLogger();
      break;
    case 'DEV':
    default:
      logger = new DevLogger();
      break;
  }

  logger.log(`Using ${process.env.LOGGER_TYPE || 'DEV'} logger`);

  try {
    const app = await NestFactory.create(AppModule, {
      logger,
    });
    app.setGlobalPrefix('api/afisha');
    app.enableCors({
      origin: 'http://films.nomorepartiessbs.ru',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.listen(3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error('Failed to start the application', error);
  }
}
bootstrap();
