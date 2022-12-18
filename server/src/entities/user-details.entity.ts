import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'src/common/decorators/decorators';
import { DbTablesNames, UniversityUserRoles } from 'src/common/enums/enums';
import { User } from './user.entity';

@Entity({ name: DbTablesNames.USERS })
export class UserDetails {
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

  @OneToOne(() => User, (user) => user.userDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'number', name: 'user_id' })
  userId: number;
}
