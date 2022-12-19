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
import { Student } from 'src/entities/entities';
import { UsersService } from './users.service';
import { GroupsService } from './groups.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {}

  getModelById(id: number): Promise<Student | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        user: true,
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
        user: true,
        group: {
          department: {
            faculty: true,
          },
        },
      },
    });

    return {
      items: studentsModels.map(({ id, userId, user, groupId, group }) => ({
        id,
        userId,
        user,
        groupId,
        group,
      })),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<StudentsGetAllItemResponseDto | null> {
    const student = await this.getModelById(idToFind);

    const { id, userId, user, groupId, group } = student;
    return { id, userId, user, groupId, group };
  }

  async create(
    student: CreateStudentRequestDto,
  ): Promise<StudentsGetAllItemResponseDto> {
    const groupToJoin = await this.groupsService.getModelById(student.groupId);

    if (!groupToJoin) {
      throw new BadRequestException(ExceptionsMessages.GROUP_DOES_NOT_EXIST);
    }

    const userInDb = await this.usersService.getModelById(student.userId);

    if (!userInDb) {
      throw new BadRequestException(ExceptionsMessages.USER_DOES_NOT_EXIST);
    }

    const newStudent = this.repository.create(student);

    const createdStudent = await this.repository.save(newStudent);
    const { id, userId, user, groupId, group } = createdStudent;

    return { id, userId, user, groupId, group };
  }

  async updateGroup(
    id: number,
    student: UpdateStudentRequestDto,
  ): Promise<StudentsGetAllItemResponseDto> {
    const studentToUpdate = await this.repository.findOne({ where: { id } });

    if (!studentToUpdate) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    if (student.groupId !== studentToUpdate.groupId) {
      const groupToJoin = await this.groupsService.getModelById(
        student.groupId,
      );

      if (!groupToJoin) {
        throw new BadRequestException(ExceptionsMessages.GROUP_DOES_NOT_EXIST);
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
