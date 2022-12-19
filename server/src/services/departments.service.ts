import { Repository } from 'typeorm';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateDepartmentRequestDto,
  DepartmentsGetAllItemResponseDto,
  DepartmentsGetAllResponseDto,
  UpdateDepartmentRequestDto,
} from 'src/common/types/types';
import { FacultiesService } from './faculties.service';
import { Department } from 'src/entities/entities';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private repository: Repository<Department>,
    private facultiesService: FacultiesService,
  ) {}

  getModelById(id: number): Promise<Department | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        faculty: true,
      },
    });
  }

  async getAll(): Promise<DepartmentsGetAllResponseDto> {
    const departmentsModels = await this.repository.find({
      relations: {
        faculty: true,
      },
    });

    return {
      items: departmentsModels.map(
        ({ id, name, shortName, facultyId, faculty }) => ({
          id,
          name,
          shortName,
          facultyId,
          faculty,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<DepartmentsGetAllItemResponseDto | null> {
    const department = await this.getModelById(idToFind);

    const { id, name, shortName, facultyId, faculty } = department;
    return { id, name, shortName, facultyId, faculty };
  }

  async create(
    department: CreateDepartmentRequestDto,
  ): Promise<DepartmentsGetAllItemResponseDto> {
    const facultyInDb = this.facultiesService.getModelById(
      department.facultyId,
    );

    if (!facultyInDb) {
      throw new BadRequestException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    const newDepartment = this.repository.create(department);

    const createdDepartment = await this.repository.save(newDepartment);

    return this.getById(createdDepartment.id);
  }

  async update(
    id: number,
    department: Partial<UpdateDepartmentRequestDto>,
  ): Promise<DepartmentsGetAllItemResponseDto> {
    const departmentToUpdate = await this.repository.findOne({ where: { id } });

    if (!departmentToUpdate) {
      throw new NotFoundException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    if (
      department.facultyId &&
      department.facultyId !== departmentToUpdate.facultyId
    ) {
      const facultyToJoin = await this.facultiesService.getModelById(
        department.facultyId,
      );

      if (!facultyToJoin) {
        throw new BadRequestException(ExceptionsMessages.FACULTY_NOT_FOUND);
      }
    }

    Object.assign(departmentToUpdate, department);
    const updatedDepartment = await this.repository.save(departmentToUpdate);

    return this.getById(updatedDepartment.id);
  }

  async delete(id: number): Promise<number> {
    const department = await this.getModelById(id);

    if (!department) {
      throw new NotFoundException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    const { id: idToSend } = department;

    await this.repository.remove(department);

    return idToSend;
  }
}
