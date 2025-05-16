import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class PostOrderDto {
  @JoiSchema(Joi.string().email().required())
  email: string;

  @JoiSchema(Joi.string().required())
  phone: string;

  @JoiSchema(Joi.array().not().empty())
  tickets: PostOrderTicketDto[];
}

export class PostOrderTicketDto {
  @JoiSchema(Joi.string().required())
  time: string;
  @JoiSchema(Joi.string().required())
  day: string;
  @JoiSchema(Joi.string().required())
  daytime: string;
  @JoiSchema(Joi.string().required())
  film: string;
  @JoiSchema(Joi.string().required())
  session: string;
  @JoiSchema(Joi.number().required())
  row: number;
  @JoiSchema(Joi.number().required())
  seat: number;
  @JoiSchema(Joi.number().required())
  price: number;
}

export class NewOrderDTO {
  total: number;
  items: PostOrderTicketDto[];
}
