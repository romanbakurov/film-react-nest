import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TicketDto } from '../dto/order.dto';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('jsonb')
  tickets: TicketDto[];
}
