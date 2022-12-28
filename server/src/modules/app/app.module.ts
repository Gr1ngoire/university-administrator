import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { ENV } from 'src/common/enums/enums';
import { AppController } from 'src/controllers/controllers';
import {
  Department,
  Discipline,
  FaqMessage,
  Faculty,
  Grant,
  Group,
  News,
  Schedule,
  Student,
  Teacher,
  User,
} from 'src/entities/entities';
import { AppService } from 'src/services/services';
import { AuthModule } from '../auth/auth.module';
import { DepartmentsModule } from '../departments/departments.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { FacultiesModule } from '../faculties/faculties.module';
import { FaqMessagesModule } from '../faq-messages/faq-messages.module';
import { GroupsModule } from '../groups/groups.module';
import { NewsModule } from '../news/news.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';
import { UsersModule } from '../users/users.module';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      entities: [
        Department,
        Discipline,
        FaqMessage,
        Faculty,
        Grant,
        Group,
        News,
        Student,
        Schedule,
        Teacher,
        User,
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
    AuthModule,
    DepartmentsModule,
    DisciplinesModule,
    FaqMessagesModule,
    FacultiesModule,
    GroupsModule,
    NewsModule,
    StudentsModule,
    TeachersModule,
    SchedulesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
