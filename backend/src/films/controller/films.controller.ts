import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from '../service/films.service';
import { GetFilmsDTO, GetSchedulesDTO } from '../dto/films.dto';
import { JoiPipe } from 'nestjs-joi';
import * as Joi from 'joi';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<GetFilmsDTO> {
    return await this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findOneSchedules(
    @Param('id', new JoiPipe(Joi.string().required())) id: string,
  ): Promise<GetSchedulesDTO> {
    const film = await this.filmsService.findOne(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id "${id}" не найден`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
