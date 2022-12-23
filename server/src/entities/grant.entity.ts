import { DbTablesNames } from 'src/common/enums/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'src/common/decorators/decorators';
import { User } from './entities';

@Entity({ name: DbTablesNames.GRANTS })
export class Grant {
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

  @OneToOne(() => User, (granted) => granted.grant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  granted: User;

  @Column({ type: 'number', name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (granter) => granter.grants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'granter_id' })
  granter: User;

  @Column({ type: 'number', name: 'granter_id' })
  granterId: number;
}
