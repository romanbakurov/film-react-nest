import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from '../service/films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const mockFilmsService = {
      findAll: jest.fn().mockReturnValue([{ id: 1, title: 'Film 1' }]),
      findById: jest.fn().mockImplementation((id: string) => ({
        id,
        title: `Film ${id}`,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all films', () => {
    const result = controller.getFindAllFilms();
    expect(result).toEqual([{ id: 1, title: 'Film 1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a film by id', () => {
    const result = controller.getFindByIdFilm('2');
    expect(result).toEqual({ id: '2', title: 'Film 2' });
    expect(service.findById).toHaveBeenCalledWith('2');
  });
});
