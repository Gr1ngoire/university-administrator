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
import { UsersService } from '../users/users.service';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {}

  getById(id: number): Promise<StudentsGetAllItemResponseDto | null> {
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
      select: {
        id: true,
        userId: true,
        groupId: true,
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
      select: {
        id: true,
        userId: true,
        groupId: true,
      },
    });

    return {
      items: studentsModels,
    };
  }

  async create(
    student: CreateStudentRequestDto,
  ): Promise<StudentsGetAllItemResponseDto> {
    const { userId, groupId } = student;
    const groupToJoin = await this.groupsService.getById(groupId);

    if (!groupToJoin) {
      throw new BadRequestException(ExceptionsMessages.GROUP_DOES_NOT_EXIST);
    }

    const userInDb = await this.usersService.getById(userId);

    if (!userInDb) {
      throw new BadRequestException(ExceptionsMessages.USER_NOT_FOUND);
    }

    const studentInDb = await this.repository.findOne({
      where: { userId },
    });

    if (studentInDb) {
      throw new BadRequestException(
        ExceptionsMessages.SUCH_STUDENT_ALREADY_EXISTS,
      );
    }

    const newStudent = this.repository.create(student);

    const createdStudent = await this.repository.save(newStudent);

    return this.getById(createdStudent.id);
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
      const groupToJoin = await this.groupsService.getById(student.groupId);

      if (!groupToJoin) {
        throw new BadRequestException(ExceptionsMessages.GROUP_DOES_NOT_EXIST);
      }
    }

    Object.assign(studentToUpdate, student);
    const updatedStudent = await this.repository.save(studentToUpdate);

    return this.getById(updatedStudent.id);
  }

  async delete(id: number): Promise<number> {
    const student = await this.repository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    const { id: idToSend } = student;

    await this.repository.remove(student);

    return idToSend;
  }
}
