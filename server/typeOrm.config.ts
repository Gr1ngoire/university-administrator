import { DataSource } from 'typeorm';
import { ENV } from 'src/common/enums/enums';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Faculty } from 'src/faculties/faculty.enitity';

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
  entities: [Discipline, Faculty],
  migrations: ['dist/src/data/migrations/*.js'],
});
