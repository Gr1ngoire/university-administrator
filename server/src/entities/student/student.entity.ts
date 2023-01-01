import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Default, Group, User } from 'src/entities/entities';

@Entity({ name: DbTablesNames.STUDENTS })
export class Student extends Default {
  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'number', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'number', name: 'group_id' })
  groupId: number;
}
