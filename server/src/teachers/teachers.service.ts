import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsMessages } from 'src/common/enums/enums';
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

  getAll(): Promise<Teacher[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Teacher | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(teacher: CreateTeacherRequestDto): Promise<Teacher> {
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
