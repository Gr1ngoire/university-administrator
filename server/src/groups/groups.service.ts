import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateGroupRequestDto,
  UpdateGroupRequestDto,
} from 'src/common/types/types';
import { DepartmentsService } from 'src/departments/departments.service';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private repository: Repository<Group>,
    private departmentsService: DepartmentsService,
  ) {}

  getAll(): Promise<Group[]> {
    return this.repository.find({
      relations: {
        department: {
          faculty: true,
        },
      },
    });
  }

  getById(id: number): Promise<Group | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        department: {
          faculty: true,
        },
      },
    });
  }

  async create(group: CreateGroupRequestDto): Promise<Group> {
    const departmentInDb = await this.departmentsService.getById(
      group.departmentId,
    );

    if (!departmentInDb) {
      throw new BadRequestException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    const newGroup = this.repository.create(group);

    const createdGroup = await this.repository.save(newGroup);

    return this.getById(createdGroup.id);
  }

  async update(
    id: number,
    group: Partial<UpdateGroupRequestDto>,
  ): Promise<Group> {
    const groupToUpdate = await this.repository.findOne({ where: { id } });

    if (!groupToUpdate) {
      throw new NotFoundException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    if (
      group.departmentId &&
      group.departmentId !== groupToUpdate.departmentId
    ) {
      const departmentToJoin = await this.departmentsService.getById(
        group.departmentId,
      );

      if (!departmentToJoin) {
        throw new BadRequestException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
      }
    }

    Object.assign(groupToUpdate, group);
    const updatedGroup = await this.repository.save(groupToUpdate);
    return this.getById(updatedGroup.id);
  }

  async delete(id: number): Promise<Group> {
    const group = await this.getById(id);

    if (!group) {
      throw new NotFoundException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    return this.repository.remove(group);
  }
}
