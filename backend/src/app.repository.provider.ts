import { AppConfig } from './app.config.provider';
// import { InMemoryRepository } from './repository/in.memory.repository';
import { MongoDbRepository } from './repository/mongodb.repository';
import { GetFilmDTO, GetFilmsDTO, PostFilmDTO } from './films/dto/films.dto';

export const repositoryProvider = {
  provide: 'REPOSITORY',
  useFactory: (config: AppConfig) => {
    switch (config.database.driver) {
      case 'mongodb':
        return new MongoDbRepository().init(config.database);
      // default:
      //   return new InMemoryRepository();
    }
  },
  inject: [{ token: 'CONFIG', optional: false }],
};

export interface AppRepository {
  films: FilmsRepository;
}

export interface InMemoryRepository {
  films: FilmsRepository;
}

export interface FilmsRepository {
  findAll(): Promise<GetFilmsDTO>;

  findById(id: string): Promise<GetFilmDTO>;

  save(film: PostFilmDTO): Promise<string>;
}
