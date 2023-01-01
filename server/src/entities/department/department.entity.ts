import { Default, Faculty, Group, Teacher } from 'src/entities/entities';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';

@Entity({ name: DbTablesNames.DEPARTMENTS })
export class Department extends Default {
  @Column()
  name: string;

  @Column({ name: 'short_name' })
  shortName: string;

  @OneToMany(() => Group, (group) => group.department)
  groups: Group[];

  @OneToMany(() => Teacher, (teacher) => teacher.department)
  teachers: Teacher[];

  @ManyToOne(() => Faculty, (faculty) => faculty.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  @Column({ type: 'number', name: 'faculty_id' })
  facultyId: number;
}
