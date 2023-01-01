import { DbTablesNames, Grants } from 'src/common/enums/enums';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'src/common/decorators/decorators';
import { Default, User } from 'src/entities/entities';

@Entity({ name: DbTablesNames.GRANTS })
export class Grant extends Default {
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
