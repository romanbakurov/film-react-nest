import { Injectable } from '@nestjs/common';
import { PostOrderTicketDto } from '../dto/order.dto';
import { FilmsService } from '../../films/service/films.service';
import { PostFilmDTO } from '../../films/dto/films.dto';

@Injectable()
export class OrderService {
  constructor(private filmsService: FilmsService) {}

  async newOrders(orders: PostOrderTicketDto[]): Promise<PostOrderTicketDto[]> {
    const filmId = orders[0].film;
    const film = await this.filmsService.findOne(filmId);
    orders.forEach((order) => {
      const schedule = film.schedule.find((sch) => sch.id === order.session);
      const seatKey = `${order.row}:${order.seat}`;
      if (schedule.taken.indexOf(seatKey) > 0) throw new Error('already taken');
      schedule.taken.push(seatKey);
    });
    await this.filmsService.save(<PostFilmDTO>film);
    return orders;
  }
}
