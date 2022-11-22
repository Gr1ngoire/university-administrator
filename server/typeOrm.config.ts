import { DataSource } from 'typeorm';
import { ENV } from 'src/common/enums/enums';
import { Discipline } from 'src/disciplines/discipline.entity';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;

export default new DataSource({
  type: TYPE,
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: NAME,
  entities: [Discipline],
  migrations: ['dist/src/data/migrations/*.js'],
});
