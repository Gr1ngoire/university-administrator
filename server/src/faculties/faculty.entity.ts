import { DbTablesNames } from 'src/common/enums/enums';
import { Department } from 'src/departments/department.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'src/common/decorators/decorators';

@Entity({ name: DbTablesNames.FACULTIES })
export class Faculty {
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

  @Column({ name: 'short_name' })
  shortName: string;

  @OneToMany(() => Department, (department) => department.faculty)
  departments: Department[];
}
