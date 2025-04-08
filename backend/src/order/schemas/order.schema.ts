import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ticket {
  @Prop()
  film: string;

  @Prop()
  session: string;

  @Prop()
  daytime: string;

  @Prop()
  row: number;

  @Prop()
  seat: number;

  @Prop()
  price: number;
}

@Schema()
export class Order {
  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [Ticket], required: true })
  tickets: Ticket[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
