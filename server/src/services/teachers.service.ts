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
import { UsersService } from './users.service';
import { DepartmentsService } from './departments.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private repository: Repository<Teacher>,
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
  ) {}

  getModelById(id: number): Promise<Teacher | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        department: {
          faculty: true,
        },
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
    });

    return {
      items: teachersModels.map(
        ({ id, userId, user, departmentId, department }) => ({
          id,
          userId,
          user,
          departmentId,
          department,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<TeachersGetAllItemResponseDto | null> {
    const teacher = await this.getModelById(idToFind);

    const { id, userId, user, departmentId, department } = teacher;
    return { id, userId, user, departmentId, department };
  }

  async create(
    teacher: CreateTeacherRequestDto,
  ): Promise<TeachersGetAllItemResponseDto> {
    const userInDb = await this.usersService.getModelById(teacher.userId);

    if (!userInDb) {
      throw new BadRequestException(ExceptionsMessages.USER_NOT_FOUND);
    }

    const departmentToJoin = await this.departmentsService.getModelById(
      teacher.departmentId,
    );

    if (!departmentToJoin) {
      throw new BadRequestException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    const newTeacher = this.repository.create(teacher);

    const createdTeacher = await this.repository.save(newTeacher);
    const { id, userId, user, departmentId, department } = createdTeacher;
    return { id, userId, user, departmentId, department };
  }

  async updateDepartment(
    idToUpdate: number,
    teacher: UpdateTeacherRequestDto,
  ): Promise<TeachersGetAllItemResponseDto> {
    const teacherToUpdate = await this.getModelById(idToUpdate);

    if (!teacherToUpdate) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    if (teacher.departmentId !== teacherToUpdate.departmentId) {
      const departmentToJoin = await this.departmentsService.getModelById(
        teacher.departmentId,
      );

      if (!departmentToJoin) {
        throw new BadRequestException(
          ExceptionsMessages.DEPARTMENT_DOES_NOT_EXIST,
        );
      }
    }

    Object.assign(teacherToUpdate, teacher);
    const updatedTeacher = await this.repository.save(teacherToUpdate);

    const { id, userId, user, departmentId, department } = updatedTeacher;
    return { id, userId, user, departmentId, department };
  }

  async delete(id: number): Promise<number> {
    const teacher = await this.getModelById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    const { id: idToSend } = teacher;

    await this.repository.remove(teacher);

    return idToSend;
  }
}
