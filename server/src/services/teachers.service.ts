import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateTeacherRequestDto,
  UpdateTeacherRequestDto,
} from 'src/common/types/types';
import { Teacher } from 'src/entities/entities';
import {
  TeachersGetAllItemResponseDto,
  TeachersGetAllResponseDto,
} from 'shared/common/types/types';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private repository: Repository<Teacher>,
  ) {}

  private getModelByEmail(email: string): Promise<Teacher | null> {
    return this.repository.findOne({ where: { email } });
  }

  getModelById(id: number): Promise<Teacher | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<TeachersGetAllResponseDto> {
    const teachersModels = await this.repository.find();

    return {
      items: teachersModels.map(({ id, userId, user }) => ({
        id,
        userId,
        user,
      })),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<TeachersGetAllItemResponseDto | null> {
    const teacher = await this.getModelById(idToFind);

    const { id, email, phone, name, surname } = teacher;
    return { id, email, phone, name, surname };
  }

  async create(
    teacher: CreateTeacherRequestDto,
  ): Promise<TeachersGetAllItemResponseDto> {
    const teacherWithSameEmail = await this.getModelByEmail(teacher.email);

    if (teacherWithSameEmail) {
      throw new BadRequestException(
        ExceptionsMessages.TEACHER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    const newTeacher = this.repository.create(teacher);

    const createdTeacher = await this.repository.save(newTeacher);
    const { id, email, phone, name, surname } = createdTeacher;
    return { id, email, phone, name, surname };
  }

  async update(
    idToUpdate: number,
    teacher: Partial<UpdateTeacherRequestDto>,
  ): Promise<TeachersGetAllItemResponseDto> {
    const teacherToUpdate = await this.getModelById(idToUpdate);

    if (!teacherToUpdate) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    if (teacher.email) {
      const teacherToCheckByEmail = await this.getModelByEmail(teacher.email);

      if (
        teacherToCheckByEmail &&
        teacher.email !== teacherToUpdate.email &&
        idToUpdate !== teacherToCheckByEmail.id
      ) {
        throw new BadRequestException(
          ExceptionsMessages.TEACHER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
        );
      }
    }

    Object.assign(teacherToUpdate, teacher);
    const updatedTeacher = await this.repository.save(teacherToUpdate);

    const { id, email, phone, name, surname } = updatedTeacher;
    return { id, email, phone, name, surname };
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
