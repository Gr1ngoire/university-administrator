import { Schedule } from 'src/schedules/schedule.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Teacher {
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
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Schedule, (schedule) => schedule.teacher)
  schedules: Schedule[];
}
