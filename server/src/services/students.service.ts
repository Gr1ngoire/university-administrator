import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateStudentRequestDto,
  StudentsGetAllItemResponseDto,
  StudentsGetAllResponseDto,
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

  getModelById(id: number): Promise<Student | null> {
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

  async getAll(): Promise<StudentsGetAllResponseDto> {
    const studentsModels = await this.repository.find({
      relations: {
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });

    return {
      items: studentsModels.map(
        ({ id, name, email, phone, group, groupId }) => ({
          id,
          name,
          email,
          phone,
          group,
          groupId,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<StudentsGetAllItemResponseDto | null> {
    const student = await this.getModelById(idToFind);

    const { id, name, email, phone, groupId, group } = student;
    return { id, name, email, phone, groupId, group };
  }

  async create(
    student: CreateStudentRequestDto,
  ): Promise<StudentsGetAllItemResponseDto> {
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
    const { id, name, email, phone, group, groupId } = createdStudent;

    return { id, name, email, phone, group, groupId };
  }

  async update(
    id: number,
    student: Partial<UpdateStudentRequestDto>,
  ): Promise<StudentsGetAllItemResponseDto> {
    const studentToUpdate = await this.getModelById(id);

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

    if (student.email) {
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
    }

    Object.assign(studentToUpdate, student);
    const updatedStudent = await this.repository.save(studentToUpdate);

    return this.getById(updatedStudent.id);
  }

  async delete(id: number): Promise<number> {
    const student = await this.getModelById(id);

    if (!student) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    const { id: idToSend } = student;

    await this.repository.remove(student);

    return idToSend;
  }
}
