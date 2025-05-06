import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { FilmsEntity } from './Films.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @Column('text', { array: true, default: [] })
  @IsArray()
  taken: string[];

  @ManyToOne(() => FilmsEntity, (film) => film.schedule, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  film: FilmsEntity;
}
