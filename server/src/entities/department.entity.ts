import { Faculty, Group, Teacher } from 'src/entities/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';

@Entity({ name: DbTablesNames.DEPARTMENTS })
export class Department {
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
