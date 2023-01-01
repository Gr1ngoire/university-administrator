import { DbTablesNames } from 'src/common/enums/enums';
import { Default, Schedule } from 'src/entities/entities';
import {
  Entity,
  Column,
  OneToMany,
  AfterRemove,
} from 'src/common/decorators/decorators';

@Entity({ name: DbTablesNames.DISCIPLINES })
export class Discipline extends Default {
  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.discipline)
  schedules: Schedule[];

  @AfterRemove()
  logRemove() {
    console.log(`User with id ${this.id} has been successfully removed`);
  }
}
