import { DbTablesNames } from 'src/common/enums/enums';
import { Default, Department } from 'src/entities/entities';
import { Entity, Column, OneToMany } from 'src/common/decorators/decorators';

@Entity({ name: DbTablesNames.FACULTIES })
export class Faculty extends Default {
  @Column()
  name: string;

  @Column({ name: 'short_name' })
  shortName: string;

  @OneToMany(() => Department, (department) => department.faculty)
  departments: Department[];
}
