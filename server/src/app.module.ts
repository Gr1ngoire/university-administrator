import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './common/enums/enums';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/discipline.entity';
import { FacultiesModule } from './faculties/faculties.module';
import { Faculty } from './faculties/faculty.entity';
import { TeachersModule } from './teachers/teachers.module';
import { Teacher } from './teachers/teacher.entity';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/department.entity';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/group.entity';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';
import { SchedulesModule } from './schedules/schedules.module';
import { Schedule } from './schedules/schedule.entity';
import { Module } from './common/decorators/decorators';
import { NewsModule } from './news/news.module';
import { News } from './news/news.entity';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      entities: [
        Department,
        Discipline,
        Faculty,
        Group,
        News,
        Student,
        Schedule,
        Teacher,
      ],
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: NAME,
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
      logging: true,
      // synchronize: ENV.APP.NODE_ENV === 'development',
    }),
    DepartmentsModule,
    DisciplinesModule,
    FacultiesModule,
    GroupsModule,
    NewsModule,
    StudentsModule,
    SchedulesModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
