import mongoose, { Mongoose } from 'mongoose';
import { AppRepository, FilmsRepository } from '../app.repository.provider';
import { FilmsMongoDbRepository } from './films.mongodb.repository';
import debug from 'debug';
import { AppConfigDatabase } from '../app.config.provider';

export class MongoDbRepository implements AppRepository {
  private connection: Mongoose;
  films: FilmsRepository;

  constructor() {}

  async init(config: AppConfigDatabase): Promise<this> {
    try {
      this.connection = await mongoose.connect(config.url);
      this.films = new FilmsMongoDbRepository(this.connection);
      return this;
    } catch (error) {
      debug('mongo')('error while connecting to database', error);
      throw error;
    }
  }
}
