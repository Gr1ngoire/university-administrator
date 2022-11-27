import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
