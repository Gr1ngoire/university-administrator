import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { ENV } from 'src/common/enums/enums';
import { AppController } from 'src/controllers/controllers';
import {
  Department,
  Discipline,
  Faculty,
  Group,
  News,
  Schedule,
  Student,
  Teacher,
} from 'src/entities/entities';
import { AppService } from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { DisciplinesModule } from './disciplines.module';
import { FacultiesModule } from './faculties.module';
import { GroupsModule } from './groups.module';
import { NewsModule } from './news.module';
import { SchedulesModule } from './schedules.module';
import { StudentsModule } from './students.module';
import { TeachersModule } from './teachers.module';

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
