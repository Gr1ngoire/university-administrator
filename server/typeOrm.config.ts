import { DataSource } from 'typeorm';
import {
  Department,
  Discipline,
  Faculty,
  Grant,
  Group,
  News,
  Schedule,
  Student,
  Teacher,
  User,
} from 'src/entities/entities';
import { ENV } from 'src/common/enums/enums';

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
  entities: [
    Department,
    Discipline,
    Faculty,
    Grant,
    Group,
    News,
    Schedule,
    Student,
    Teacher,
    User,
  ],
  migrations: ['dist/server/src/data/migrations/*.js'],
});
