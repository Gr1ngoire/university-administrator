import { Discipline } from 'src/disciplines/discipline.entity';
import { Group } from 'src/groups/groups.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  time: string;

  @Column()
  classroom: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedules)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Discipline, (discipline) => discipline.schedules)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @ManyToOne(() => Group, (group) => group.schedules)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
