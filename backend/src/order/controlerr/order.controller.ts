import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from '../dto/order.dto';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async orderTickets(@Body() orderDto: OrderDto) {
    return await this.orderService.orderTickets(orderDto);
  }
}
