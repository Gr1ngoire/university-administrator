import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateTeacherRequestDto,
  TeachersGetAllItemResponseDto,
  TeachersGetAllResponseDto,
  UpdateTeacherRequestDto,
} from 'src/common/types/types';
import { Teacher } from 'src/entities/entities';
import { UsersService } from '../users/users.service';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private repository: Repository<Teacher>,
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
  ) {}

  getById(id: number): Promise<TeachersGetAllItemResponseDto | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        department: {
          faculty: true,
        },
      },
      select: {
        id: true,
        userId: true,
        departmentId: true,
      },
    });
  }

  async getAll(): Promise<TeachersGetAllResponseDto> {
    const teachersModels = await this.repository.find({
      relations: {
        user: true,
        department: {
          faculty: true,
        },
      },
      select: {
        id: true,
        userId: true,
        departmentId: true,
      },
    });

    return {
      items: teachersModels,
    };
  }

  async create(
    teacher: CreateTeacherRequestDto,
  ): Promise<TeachersGetAllItemResponseDto> {
    const { userId, departmentId } = teacher;
    const userInDb = await this.usersService.getById(teacher.userId);

    if (!userInDb) {
      throw new BadRequestException(ExceptionsMessages.USER_NOT_FOUND);
    }

    const departmentToJoin = await this.departmentsService.getById(
      departmentId,
    );

    if (!departmentToJoin) {
      throw new BadRequestException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    const teacherInDb = await this.repository.findOne({ where: { userId } });

    if (teacherInDb) {
      throw new BadRequestException(
        ExceptionsMessages.SUCH_TEACHER_ALREADY_EXISTS,
      );
    }

    const newTeacher = this.repository.create(teacher);

    const createdTeacher = await this.repository.save(newTeacher);

    return this.getById(createdTeacher.id);
  }

  async updateDepartment(
    idToUpdate: number,
    teacher: UpdateTeacherRequestDto,
  ): Promise<TeachersGetAllItemResponseDto> {
    const teacherToUpdate = await this.repository.findOne({
      where: { id: idToUpdate },
    });

    if (!teacherToUpdate) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    const departmentToJoin = await this.departmentsService.getById(
      teacher.departmentId,
    );

    if (!departmentToJoin) {
      throw new BadRequestException(
        ExceptionsMessages.DEPARTMENT_DOES_NOT_EXIST,
      );
    }

    Object.assign(teacherToUpdate, teacher);
    const updatedTeacher = await this.repository.save(teacherToUpdate);

    return this.getById(updatedTeacher.id);
  }

  async delete(id: number): Promise<number> {
    const teacher = await this.repository.findOne({ where: { id } });

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    const { id: idToSend } = teacher;

    await this.repository.remove(teacher);

    return idToSend;
  }
}
