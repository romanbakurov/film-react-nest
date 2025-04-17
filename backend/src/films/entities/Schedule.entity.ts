import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { FilmsEntity } from './Films.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column({ nullable: true })
  @IsString()
  hall: string;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column({ nullable: true })
  @IsNumber()
  price: number;

  @Column({ type: 'simple-array', default: '' })
  taken: string;

  @ManyToOne(() => FilmsEntity, (film) => film.schedule)
  @JoinColumn()
  film: FilmsEntity;
}
