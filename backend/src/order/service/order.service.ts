import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { FilmsRepository } from '../../repository/films.repository';
import { OrderDto, TicketDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async orderTickets(
    createOrder: OrderDto,
  ): Promise<{ total: number; tickets: TicketDto[] }> {
    const { tickets } = createOrder;

    const order = new this.orderModel({ total: tickets.length, tickets });

    for (const ticket of tickets) {
      const { film: filmId, session: sessionId, row, seat, daytime } = ticket;

      // Получить занятые места
      const film = await this.filmsRepository.findById(filmId);
      const session = film.schedule.find((item) => item.id === sessionId);

      // Уникальный ключ для этого места
      const seatKey = `${row}:${seat}`;

      // Проверить, занято ли уже место
      if (session.taken.includes(seatKey)) {
        throw new ConflictException(`${daytime} место ${seatKey}  уже занято`);
      }

      // Добавить место в список занятых мест
      session.taken.push(seatKey);
      await film.save();
    }

    return order.save().then((doc) => {
      return { total: doc.tickets.length, tickets: doc.tickets };
    });
  }
}
