import { Entity, Column } from 'src/common/decorators/decorators';
import { DbTablesNames } from 'src/common/enums/enums';
import { Default } from 'src/entities/entities';

@Entity({ name: DbTablesNames.NEWS })
export class News extends Default {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'img_url', nullable: true })
  imgUrl: string;
}
