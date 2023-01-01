import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Default, Department, Schedule, User } from 'src/entities/entities';

@Entity({ name: DbTablesNames.TEACHERS })
export class Teacher extends Default {
  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'number', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Department, (department) => department.teachers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: 'number', name: 'department_id' })
  departmentId: number;

  @OneToMany(() => Schedule, (schedule) => schedule.teacher)
  schedules: Schedule[];
}
