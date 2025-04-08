export class OrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}
