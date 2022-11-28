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
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private repository: Repository<Teacher>,
  ) {}

  private getByEmail(email: string): Promise<Teacher | null> {
    return this.repository.findOne({ where: { email } });
  }

  getAll(): Promise<Teacher[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Teacher | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(teacher: CreateTeacherRequestDto): Promise<Teacher> {
    const teacherWithSameEmail = await this.getByEmail(teacher.email);

    if (teacherWithSameEmail) {
      throw new BadRequestException(
        ExceptionsMessages.TEACHER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    const newTeacher = this.repository.create(teacher);

    return this.repository.save(newTeacher);
  }

  async update(
    id: number,
    teacher: Partial<UpdateTeacherRequestDto>,
  ): Promise<Teacher> {
    const teacherToUpdate = await this.getById(id);

    if (!teacherToUpdate) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    const teacherToCheckByEmail = await this.getByEmail(teacher.email);

    if (
      teacherToCheckByEmail &&
      teacher.email !== teacherToUpdate.email &&
      id !== teacherToCheckByEmail.id
    ) {
      throw new BadRequestException(
        ExceptionsMessages.TEACHER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    Object.assign(teacherToUpdate, teacher);
    return this.repository.save(teacherToUpdate);
  }

  async delete(id: number): Promise<Teacher> {
    const teacher = await this.getById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    return this.repository.remove(teacher);
  }
}
