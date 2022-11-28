import { DataSource } from 'typeorm';
import { ENV } from 'src/common/enums/enums';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Faculty } from 'src/faculties/faculty.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Department } from 'src/departments/department.entity';
import { Group } from 'src/groups/group.entity';
import { Student } from 'src/students/student.entity';
import { Schedule } from 'src/schedules/schedule.entity';
import { News } from 'src/news/news.entity';

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
    Group,
    News,
    Schedule,
    Student,
    Teacher,
  ],
  migrations: ['dist/server/src/data/migrations/*.js'],
});
