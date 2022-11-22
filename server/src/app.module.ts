import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './common/enums/enums';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/discipline.entity';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      entities: [Discipline],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
