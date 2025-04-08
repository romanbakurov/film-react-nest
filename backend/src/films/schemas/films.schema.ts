import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Schedule {
  @Prop()
  id: string;

  @Prop()
  daytime: string;

  @Prop()
  hall: string;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ type: [ScheduleSchema], required: true })
  schedule: Schedule[];
}

export const FilmsSchema = SchemaFactory.createForClass(Film);
