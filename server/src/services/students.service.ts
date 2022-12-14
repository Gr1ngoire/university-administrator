import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateStudentRequestDto,
  UpdateStudentRequestDto,
} from 'src/common/types/types';
import { GroupsService } from 'src/services/services';
import { Student } from 'src/entities/entities';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
    private groupsService: GroupsService,
  ) {}

  private getByEmail(email: string): Promise<Student | null> {
    return this.repository.findOne({ where: { email } });
  }

  getAll(): Promise<Student[]> {
    return this.repository.find({
      relations: {
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });
  }

  getById(id: number): Promise<Student | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });
  }

  async create(student: CreateStudentRequestDto): Promise<Student> {
    const studentWithSameEmail = await this.getByEmail(student.email);

    if (studentWithSameEmail) {
      throw new BadRequestException(
        ExceptionsMessages.STUDENT_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    const groupToJoin = await this.groupsService.getModelById(student.groupId);

    if (!groupToJoin) {
      throw new BadRequestException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    const newStudent = this.repository.create(student);

    const createdStudent = await this.repository.save(newStudent);

    return this.getById(createdStudent.id);
  }

  async update(
    id: number,
    student: Partial<UpdateStudentRequestDto>,
  ): Promise<Student> {
    const studentToUpdate = await this.getById(id);

    if (!studentToUpdate) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    if (student.groupId && student.groupId !== studentToUpdate.groupId) {
      const groupToJoin = await this.groupsService.getModelById(
        student.groupId,
      );

      if (!groupToJoin) {
        throw new BadRequestException(ExceptionsMessages.GROUP_NOT_FOUND);
      }
    }

    const studentToCheckByEmail = await this.getByEmail(student.email);

    if (
      studentToCheckByEmail &&
      student.email !== studentToUpdate.email &&
      id !== studentToCheckByEmail.id
    ) {
      throw new BadRequestException(
        ExceptionsMessages.STUDENT_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    Object.assign(studentToUpdate, student);
    return this.repository.save(studentToUpdate);
  }

  async delete(id: number): Promise<Student> {
    const student = await this.getById(id);

    if (!student) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    return this.repository.remove(student);
  }
}
