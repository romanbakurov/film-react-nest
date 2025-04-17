import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TicketDto } from '../dto/order.dto';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('jsonb')
  tickets: Array<{
    film: string;
    session: string;
    daytime: string;
    day: string;
    time: string;
    row: number;
    seat: number;
    price: number;
  }>;
}
