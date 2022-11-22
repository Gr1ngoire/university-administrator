import { DataSource } from 'typeorm';
import { ENV } from 'src/common/enums/enums';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Faculty } from 'src/faculties/faculty.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Department } from 'src/departments/department.entity';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;

// To make migration
// npm run typeorm -- migration:generate ./src/data/migrations/[--name]

export default new DataSource({
  type: TYPE,
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: NAME,
  entities: [Discipline, Faculty, Teacher, Department],
  migrations: ['dist/src/data/migrations/*.js'],
});
