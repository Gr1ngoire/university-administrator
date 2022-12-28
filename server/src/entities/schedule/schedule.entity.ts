import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Discipline, Group, Teacher } from '../entities';

@Entity({ name: DbTablesNames.SCHEDULES })
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
  time: string;

  @Column()
  classroom: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column({ type: 'number', name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => Discipline, (discipline) => discipline.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @Column({ type: 'number', name: 'discipline_id' })
  disciplineId: number;

  @ManyToOne(() => Group, (group) => group.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'number', name: 'group_id' })
  groupId: number;
}
