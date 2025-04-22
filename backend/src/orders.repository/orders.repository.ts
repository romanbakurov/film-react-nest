import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../order/entities/Orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  async createOrder(order: OrdersEntity): Promise<OrdersEntity> {
    return await this.ordersRepository.save(order);
  }
}
