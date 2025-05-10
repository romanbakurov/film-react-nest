import { Injectable } from '@nestjs/common';
import { FilmsEntity } from '../films/entities/Films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../films/entities/Schedule.entity';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmRepository: Repository<FilmsEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  // Получаем все фильмы
  async findAll(): Promise<{ total: number; items: FilmsEntity[] }> {
    try {
      const [total, items] = await Promise.all([
        this.filmRepository.count(),
        this.filmRepository.find({ relations: ['schedule'] }),
      ]);

      return { total, items };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при извлечении фильмов: ' + error.message,
      );
    }
  }

  // Получаем фильм по id
  async findById(id: string): Promise<FilmsEntity | null> {
    try {
      const film = await this.filmRepository.findOne({
        where: { id },
        relations: ['schedule'],
      });

      if (!film) {
        throw new NotFoundException(`Фильм с id ${id} не найден`);
      }

      return film;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // пробрасываем NotFoundException как есть
      }

      throw new InternalServerErrorException(
        'Ошибка при извлечении фильма по id: ' + error.message,
      );
    }
  }

  // Сохраняем новый фильм или обновляем существующий
  async saveFilm(film: FilmsEntity): Promise<FilmsEntity> {
    try {
      return await this.filmRepository.save(film);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка сохранения фильма: ' + error.message,
      );
    }
  }
}
