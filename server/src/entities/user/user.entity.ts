import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import {
  Default,
  FaqMessage,
  Grant,
  Student,
  Teacher,
} from 'src/entities/entities';

@Entity({ name: DbTablesNames.USERS })
export class User extends Default {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ name: 'second_name' })
  secondName: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Student, (student) => student.user)
  student: Student;

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher;

  @OneToOne(() => Grant, (grant) => grant.user)
  grant: Grant;

  @OneToMany(() => Grant, (grant) => grant.granter)
  grants: Grant[];

  @OneToMany(() => FaqMessage, (faq) => faq.author)
  faqMessages: FaqMessage[];
}
