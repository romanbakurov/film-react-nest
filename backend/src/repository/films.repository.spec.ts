import { Test, TestingModule } from '@nestjs/testing';
import { FilmsMongoDbRepository } from './films.mongodb.repository';

describe('FilmsMongodbRepository', () => {
  let provider: FilmsMongoDbRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsMongoDbRepository],
    }).compile();

    provider = module.get<FilmsMongoDbRepository>(FilmsMongoDbRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
