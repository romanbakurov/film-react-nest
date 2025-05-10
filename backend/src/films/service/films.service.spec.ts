import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../../films.repository/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  const mockFilmsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all films', async () => {
      const films = [
        { id: '1', title: 'Film 1' },
        { id: '2', title: 'Film 2' },
      ];
      mockFilmsRepository.findAll.mockResolvedValue(films);

      const result = await service.findAll();
      expect(result).toEqual(films);
      expect(mockFilmsRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return film by id with its schedule', async () => {
      const film = {
        schedule: ['Schedule 1', 'Schedule 2'],
      };
      mockFilmsRepository.findById.mockResolvedValue(film);

      const result = await service.findById('1');
      expect(result).toEqual({
        total: film.schedule.length,
        items: film.schedule,
      });
    });

    it('should handle case when film is not found', async () => {
      mockFilmsRepository.findById.mockResolvedValue(null);

      const result = await service.findById('999');
      expect(result).toEqual({
        total: 0,
        items: [],
      });
    });

    it('should handle case when findById throws an error', async () => {
      const error = new Error('Some error');
      mockFilmsRepository.findById.mockRejectedValue(error);

      try {
        await service.findById('1');
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });
});
