import { ConflictException, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../../films.repository/films.repository';
import { OrderDto, TicketDto } from '../dto/order.dto';
import { OrdersRepository } from '../../orders.repository/orders.repository';
import { OrdersEntity } from '../entities/Orders.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async orderTickets(
    createOrder: OrderDto,
  ): Promise<{ total: number; items: TicketDto[] }> {
    const { tickets } = createOrder;

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
      const seatIndex = session.taken.split(',');
      // Добавьте новый ключ к месту
      seatIndex.push(seatKey);
      // Join back to a string for saving
      session.taken = seatIndex.join(',');

      await this.filmsRepository.saveFilm(film);
    }

    // Сохранить заказ и вернуть JSON
    const order = new OrdersEntity();
    order.email = createOrder.email;
    order.phone = createOrder.phone;
    order.tickets = createOrder.tickets;

    return this.ordersRepository.createOrder(order).then((doc) => {
      return { total: doc.tickets.length, items: doc.tickets };
    });
  }
}
