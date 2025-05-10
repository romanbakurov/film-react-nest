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
  ) {
  }

  async orderTickets(
    createOrder: OrderDto,
  ): Promise<{ total: number; items: TicketDto[] }> {
    const { tickets, email, phone } = createOrder;

    if (!tickets.length) {
      throw new ConflictException('Список билетов пуст');
    }

    // Предполагается, что все билеты относятся к одному фильму
    const filmId = tickets[0].film;
    const film = await this.filmsRepository.findById(filmId);
    if (!film) {
      throw new ConflictException(`Фильм с id ${filmId} не найден`);
    }

    // Проверка и обновление сеансов
    for (const ticket of tickets) {
      const { session: sessionId, row, seat, daytime } = ticket;

      const session = film.schedule.find((item) => item.id === sessionId);
      if (!session) {
        throw new ConflictException(`Сеанс с id ${sessionId} не найден`);
      }

      if (!Array.isArray(session.taken)) {
        session.taken = [];
      }

      const seatKey = `${row}:${seat}`;
      if (session.taken.includes(seatKey)) {
        throw new ConflictException(
          `Место ${seatKey} на ${daytime} уже занято`,
        );
      }

      // Добавляем место в список занятых
      session.taken.push(seatKey);
    }

    // Сохраняем обновлённый фильм с изменённым taken
    await this.filmsRepository.saveFilm(film);

    // Сохраняем заказ
    const order = new OrdersEntity();
    order.email = email;
    order.phone = phone;
    order.tickets = tickets;

    const saveOrder = await this.ordersRepository.createOrder(order);

    return {
      total: saveOrder.tickets.length,
      items: saveOrder.tickets,
    };
  }
}
