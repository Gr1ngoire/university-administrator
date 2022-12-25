import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import { Schedule } from 'src/entities/entities';
import {
  CreateScheduleRequestDto,
  SchedulesGetAllItemResponseDto,
  SchedulesGetAllResponseDto,
  UpdateScheduleRequestDto,
} from 'src/common/types/types';
import { GroupsService } from './groups.service';
import { DisciplinesService } from './disciplines.service';
import { TeachersService } from './teachers.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private repository: Repository<Schedule>,
    private groupsService: GroupsService,
    private disciplinesService: DisciplinesService,
    private teachersService: TeachersService,
  ) {}

  getModelById(id: number): Promise<Schedule | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teacher: {
          user: true,
          department: true,
        },
        discipline: true,
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });
  }

  async getAll(): Promise<SchedulesGetAllResponseDto> {
    const schedulesModels = await this.repository.find({
      relations: {
        teacher: {
          user: true,
          department: true,
        },
        discipline: true,
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });

    return {
      items: schedulesModels.map(
        ({
          id,
          time,
          classroom,
          teacherId,
          teacher,
          disciplineId,
          discipline,
          groupId,
          group,
        }) => ({
          id,
          time,
          classroom,
          teacherId,
          teacher,
          disciplineId,
          discipline,
          groupId,
          group,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<SchedulesGetAllItemResponseDto | null> {
    const schedule = await this.getModelById(idToFind);

    const {
      id,
      time,
      classroom,
      groupId,
      group,
      disciplineId,
      discipline,
      teacherId,
      teacher,
    } = schedule;
    return {
      id,
      time,
      classroom,
      groupId,
      group,
      disciplineId,
      discipline,
      teacherId,
      teacher,
    };
  }

  async create(
    schedule: CreateScheduleRequestDto,
  ): Promise<SchedulesGetAllItemResponseDto> {
    const teacherInDb = await this.teachersService.getModelById(
      schedule.teacherId,
    );

    if (!teacherInDb) {
      throw new BadRequestException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    const disciplineInDb = await this.disciplinesService.getModelById(
      schedule.disciplineId,
    );

    if (!disciplineInDb) {
      throw new BadRequestException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    const groupInDb = await this.groupsService.getModelById(schedule.groupId);

    if (!groupInDb) {
      throw new BadRequestException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    const newSchedule = this.repository.create(schedule);

    const createdSchedule = await this.repository.save(newSchedule);

    return this.getById(createdSchedule.id);
  }

  async update(
    id: number,
    schedule: Partial<UpdateScheduleRequestDto>,
  ): Promise<SchedulesGetAllItemResponseDto> {
    const scheduleToUpdate = await this.repository.findOne({ where: { id } });

    if (!scheduleToUpdate) {
      throw new NotFoundException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    if (
      schedule.teacherId &&
      schedule.teacherId !== scheduleToUpdate.teacherId
    ) {
      const techerToAdd = await this.teachersService.getModelById(
        schedule.teacherId,
      );

      if (!techerToAdd) {
        throw new BadRequestException(ExceptionsMessages.TEACHER_NOT_FOUND);
      }
    }

    if (
      schedule.disciplineId &&
      schedule.disciplineId !== scheduleToUpdate.disciplineId
    ) {
      const disciplineToAdd = await this.disciplinesService.getModelById(
        schedule.disciplineId,
      );

      if (!disciplineToAdd) {
        throw new BadRequestException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
      }
    }

    if (schedule.groupId && schedule.groupId !== scheduleToUpdate.groupId) {
      const groupToAdd = await this.groupsService.getModelById(
        schedule.groupId,
      );

      if (!groupToAdd) {
        throw new BadRequestException(ExceptionsMessages.GROUP_NOT_FOUND);
      }
    }

    Object.assign(scheduleToUpdate, schedule);
    const updatedSchedule = await this.repository.save(scheduleToUpdate);

    return this.getById(updatedSchedule.id);
  }

  async delete(id: number): Promise<number> {
    const schedule = await this.getModelById(id);

    if (!schedule) {
      throw new NotFoundException(ExceptionsMessages.SCHEDULE_NOT_FOUND);
    }

    const { id: idToSend } = schedule;

    await this.repository.remove(schedule);

    return idToSend;
  }
}
