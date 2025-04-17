import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ScheduleEntity } from './Schedule.entity';

@Entity('films')
export class FilmsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column('text', { array: true, nullable: true, default: [] })
  @IsArray()
  tags: string[];

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedule: ScheduleEntity[];
}
