import mongoose from 'mongoose';
import { ScheduleSchema } from '../../films/schemas/films.schema';

export const FilmSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  schedule: [ScheduleSchema],
});

const Film = mongoose.model('Film', FilmSchema);

export default Film;
