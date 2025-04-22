import { Injectable } from '@nestjs/common';
import { FilmsEntity } from '../films/entities/Films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../films/entities/Schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmRepository: Repository<FilmsEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<{ total: number; items: FilmsEntity[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({ relations: ['schedule'] }),
    ]);

    return { total, items };
  }

  async findById(id: string): Promise<FilmsEntity | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async saveFilm(film: FilmsEntity): Promise<FilmsEntity> {
    return this.filmRepository.save(film);
  }
}
