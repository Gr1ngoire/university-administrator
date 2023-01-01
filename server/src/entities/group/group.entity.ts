import { DbTablesNames } from 'src/common/enums/enums';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'src/common/decorators/decorators';
import { Default, Department, Schedule, Student } from 'src/entities/entities';

@Entity({ name: DbTablesNames.GROUPS })
export class Group extends Default {
  @Column()
  name: string;

  @Column()
  course: number;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @OneToMany(() => Schedule, (schedule) => schedule.group)
  schedules: Schedule[];

  @ManyToOne(() => Department, (department) => department.groups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: 'number', name: 'department_id' })
  departmentId: number;
}
