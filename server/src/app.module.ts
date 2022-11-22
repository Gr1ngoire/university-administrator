import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './common/enums/enums';

const { TYPE, HOST, PORT, USERNAME, PASSWORD, NAME } = ENV.DB;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      entities: [],
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: NAME,
      migrations: ['dist/migrations/*.ts'],
      migrationsTableName: 'migrations',
      // disable in production
      // synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
