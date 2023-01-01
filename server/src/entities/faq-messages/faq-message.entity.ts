import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Default, User } from 'src/entities/entities';

@Entity({ name: DbTablesNames.FAQ })
export class FaqMessage extends Default {
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.faqMessages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'number', name: 'author_id' })
  authorId: number;
}
