import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Student, Teacher } from '../entities';
import { FaqMessage } from '../faq-messages/faq-message.entity';
import { Grant } from '../grant/grant.entity';

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
