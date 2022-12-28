import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateGroupRequestDto,
  GroupsGetAllItemResponseDto,
  GroupsGetAllResponseDto,
  UpdateGroupRequestDto,
} from 'src/common/types/types';
import { DepartmentsService } from 'src/services/services';
import { Group } from 'src/entities/entities';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private repository: Repository<Group>,
    private departmentsService: DepartmentsService,
  ) {}

  getById(id: number): Promise<GroupsGetAllItemResponseDto | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        department: {
          faculty: true,
        },
      },
      select: {
        id: true,
        name: true,
        departmentId: true,
        course: true,
      },
    });
  }

  async getAll(): Promise<GroupsGetAllResponseDto> {
    const groupsModels = await this.repository.find({
      relations: {
        department: {
          faculty: true,
        },
      },
      select: {
        id: true,
        name: true,
        departmentId: true,
        course: true,
      },
    });

    return {
      items: groupsModels,
    };
  }

  async create(
    group: CreateGroupRequestDto,
  ): Promise<GroupsGetAllItemResponseDto> {
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
  ): Promise<GroupsGetAllItemResponseDto> {
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

  async delete(id: number): Promise<number> {
    const group = await this.repository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    const { id: idToSend } = group;

    await this.repository.remove(group);

    return idToSend;
  }
}
