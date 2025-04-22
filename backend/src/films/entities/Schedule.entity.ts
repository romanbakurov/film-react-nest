import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { FilmsEntity } from './Films.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsString()
  hall: string;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  taken: string;

  @ManyToOne(() => FilmsEntity, (film) => film.schedule, { cascade: true })
  film: FilmsEntity;
}
