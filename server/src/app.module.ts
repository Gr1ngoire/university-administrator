import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './common/enums/enums';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/discipline.entity';
import { FacultiesModule } from './faculties/faculties.module';
import { Faculty } from './faculties/faculty.enitity';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      entities: [Discipline, Faculty],
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
    DisciplinesModule,
    FacultiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
