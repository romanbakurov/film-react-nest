import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDTO } from '../films/dto/films.dto';
import { Film, FilmDocument } from '../films/schemas/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  private getFilmFromDataBase(): (filmDataBase: GetFilmDTO) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        title: root.title,
        about: root.about,
        description: root.description,
        image: root.image,
        cover: root.cover,
        schedule: root.schedule,
      };
    };
  }

  async findAll(): Promise<{ total: number; items: GetFilmDTO[] }> {
    const films = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments({});
    return { total, items: films.map(this.getFilmFromDataBase()) };
  }

  async findById(id: string): Promise<FilmDocument> {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      throw new NotFoundException(`Фильм не найден`);
    }
    return film;
  }
}
