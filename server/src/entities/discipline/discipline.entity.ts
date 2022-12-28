import { DbTablesNames } from 'src/common/enums/enums';
import { Schedule } from 'src/entities/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterRemove,
} from 'src/common/decorators/decorators';

@Entity({ name: DbTablesNames.DISCIPLINES })
export class Discipline {
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

  @OneToMany(() => Schedule, (schedule) => schedule.discipline)
  schedules: Schedule[];

  @AfterRemove()
  logRemove() {
    console.log(`User with id ${this.id} has been successfully removed`);
  }
}
