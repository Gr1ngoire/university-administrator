import { DbTablesNames, Grants } from 'src/common/enums/enums';
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
  user: User;

  @Column({ type: 'number', name: 'user_id' })
  userId: number;

  @Column({ type: 'enum', enum: Grants, default: Grants.USER })
  grant: Grants;

  @ManyToOne(() => User, (granter) => granter.grants, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'granter_id' })
  granter: User | null;

  @Column({ type: 'number', name: 'granter_id', nullable: true })
  granterId: number | null;
}
