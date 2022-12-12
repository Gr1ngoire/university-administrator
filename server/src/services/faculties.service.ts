import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateFacultyRequestDto,
  UpdateFacultyRequestDto,
} from 'src/common/types/types';
import { Faculty } from 'src/entities/entities';
import {
  FacultiesGetAllItemResponseDto,
  FacultiesGetAllResponseDto,
} from 'shared/common/types/types';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty) private repository: Repository<Faculty>,
  ) {}

  getModelById(id: number): Promise<Faculty | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<FacultiesGetAllResponseDto> {
    const facultiesModels = await this.repository.find();

    return {
      items: facultiesModels.map(({ id, name, shortName }) => ({
        id,
        name,
        shortName,
      })),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<FacultiesGetAllItemResponseDto | null> {
    const faculty = await this.repository.findOne({ where: { id: idToFind } });

    const { id, name, shortName } = faculty;
    return { id, name, shortName };
  }

  async create(
    faculty: CreateFacultyRequestDto,
  ): Promise<FacultiesGetAllItemResponseDto> {
    const newFaculty = this.repository.create(faculty);

    const createdFaculty = await this.repository.save(newFaculty);
    const { id, name, shortName } = createdFaculty;
    return { id, name, shortName };
  }

  async update(
    idToUpdate: number,
    faculty: UpdateFacultyRequestDto,
  ): Promise<FacultiesGetAllItemResponseDto> {
    const facultyToUpdate = await this.getModelById(idToUpdate);

    if (!facultyToUpdate) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    Object.assign(facultyToUpdate, faculty);
    const updatedRepositore = await this.repository.save(facultyToUpdate);

    const { id, name, shortName } = updatedRepositore;
    return { id, name, shortName };
  }

  async delete(id: number): Promise<number> {
    const faculty = await this.getModelById(id);

    if (!faculty) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    const { id: idToSend } = faculty;

    await this.repository.remove(faculty);

    return idToSend;
  }
}
