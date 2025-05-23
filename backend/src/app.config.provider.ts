import { ConfigModule } from '@nestjs/config';

export const appConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: appConfig.DATABASE_DRIVER || 'postgres',
      url: appConfig.DATABASE_URL || 'postgresql://localhost:5432/prac',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
