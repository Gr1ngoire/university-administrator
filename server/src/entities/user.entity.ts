import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'src/common/decorators/decorators';
import { DbTablesNames, UniversityUserRoles } from 'src/common/enums/enums';
import { Student, Teacher } from './entities';

@Entity({ name: DbTablesNames.USERS })
export class User {
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

  @Column({ name: 'column_name' })
  secondName: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: UniversityUserRoles,
    default: UniversityUserRoles.STUDENT,
  })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Student, (student) => student.user)
  student: Student;

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher;
}
