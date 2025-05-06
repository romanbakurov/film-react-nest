import { FilmsRepository } from './films.repository';
import { Repository } from 'typeorm';
import { FilmsEntity } from '../films/entities/Films.entity';
import { ScheduleEntity } from '../films/entities/Schedule.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('FilmsRepository', () => {
  let filmsRepository: FilmsRepository;
  let filmRepositoryMock: jest.Mocked<Repository<FilmsEntity>>;
  let scheduleRepositoryMock: jest.Mocked<Repository<ScheduleEntity>>;

  beforeEach(() => {
    // Мокаем репозиторий фильмов и расписаний
    filmRepositoryMock = {
      count: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<FilmsEntity>>;

    scheduleRepositoryMock = {
      // Здесь можете моки добавить для методов ScheduleRepository, если нужно
      count: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<ScheduleEntity>>;

    // Передаем оба мока в конструктор FilmsRepository
    filmsRepository = new FilmsRepository(
      filmRepositoryMock,
      scheduleRepositoryMock,
    );
  });

  describe('findAll', () => {
    it('should return all films with their schedules', async () => {
      const mockFilms = [
        {
          id: '1',
          title: 'Film 1',
          schedule: [],
          rating: 5,
          director: 'Some Director',
          tags: ['Action'],
          image: 'image.jpg',
          cover: 'cover.jpg',
          about: 'about',
          description: 'A great film',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const mockCount = 1;

      // Мокаем методы TypeORM
      filmRepositoryMock.count.mockResolvedValue(mockCount);
      filmRepositoryMock.find.mockResolvedValue(mockFilms);

      const result = await filmsRepository.findAll();

      expect(result.total).toBe(mockCount);
      expect(result.items).toEqual(mockFilms);
      expect(filmRepositoryMock.find).toHaveBeenCalledWith({
        relations: ['schedule'],
      });
    });

    it('should throw an error if there is a database issue', async () => {
      const mockError = new Error('Database error');
      filmRepositoryMock.find.mockRejectedValue(mockError);

      await expect(filmsRepository.findAll()).rejects.toThrow(
        new InternalServerErrorException(
          'Ошибка при извлечении фильмов: ' + mockError.message,
        ),
      );
    });
  });

  describe('findById', () => {
    it('should return a film by id', async () => {
      const mockFilm = {
        id: '1',
        title: 'Film 1',
        schedule: [],
        rating: 5,
        director: 'Some Director',
        tags: ['action'],
        image: 'image.jpg',
        cover: 'cover.jpg',
        about: 'Some short text',
        description: 'A great film',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      filmRepositoryMock.findOne.mockResolvedValue(mockFilm);

      const result = await filmsRepository.findById('1');

      expect(result).toEqual(mockFilm);
      expect(filmRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['schedule'],
      });
    });

    it('should throw NotFoundException if film is not found', async () => {
      filmRepositoryMock.findOne.mockResolvedValue(null);

      await expect(filmsRepository.findById('1')).rejects.toThrow(
        new NotFoundException('Фильм с id 1 не найден'),
      );
    });

    it('should throw an error if there is a database issue', async () => {
      const mockError = new Error('Database error');
      filmRepositoryMock.findOne.mockRejectedValue(mockError);

      await expect(filmsRepository.findById('1')).rejects.toThrow(
        new InternalServerErrorException(
          'Ошибка при извлечении фильма по id: ' + mockError.message,
        ),
      );
    });
  });

  describe('saveFilm', () => {
    it('should save a new film and return it', async () => {
      const mockFilm = {
        id: '1',
        title: 'Film 1',
        schedule: [],
        rating: 5,
        director: 'Some Director',
        tags: ['action'],
        image: 'image.jpg',
        cover: 'cover.jpg',
        about: 'Some short text',
        description: 'A great film',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      filmRepositoryMock.save.mockResolvedValue(mockFilm);

      const result = await filmsRepository.saveFilm(mockFilm);

      expect(result).toEqual(mockFilm);
      expect(filmRepositoryMock.save).toHaveBeenCalledWith(mockFilm);
    });

    it('should throw an error if there is a database issue', async () => {
      const mockFilm = {
        id: '1',
        title: 'Film 1',
        schedule: [],
        rating: 5,
        director: 'Some Director',
        tags: ['action'],
        image: 'image.jpg',
        cover: 'cover.jpg',
        about: 'Some short text',
        description: 'A great film',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockError = new Error('Database error');
      filmRepositoryMock.save.mockRejectedValue(mockError);

      await expect(filmsRepository.saveFilm(mockFilm)).rejects.toThrow(
        new InternalServerErrorException(
          'Ошибка сохранения фильма: ' + mockError.message,
        ),
      );
    });
  });
});
