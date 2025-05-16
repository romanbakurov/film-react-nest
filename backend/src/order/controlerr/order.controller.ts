import { Body, Controller, Post } from '@nestjs/common';
import { NewOrderDTO, PostOrderDto } from '../dto/order.dto';
import { OrderService } from '../service/order.service';
import { JoiPipe } from 'nestjs-joi';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async postOrder(@Body(JoiPipe) body: PostOrderDto): Promise<NewOrderDTO> {
    const orders = await this.orderService.newOrders(body.tickets);
    return <NewOrderDTO>{
      total: orders.length,
      items: orders,
    };
  }
}
