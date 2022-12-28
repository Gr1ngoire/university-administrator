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

  getById(id: number): Promise<FacultiesGetAllItemResponseDto | null> {
    return this.repository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        shortName: true,
      },
    });
  }

  async getAll(): Promise<FacultiesGetAllResponseDto> {
    const facultiesModels = await this.repository.find({
      select: {
        id: true,
        name: true,
        shortName: true,
      },
    });

    return {
      items: facultiesModels,
    };
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
    const facultyToUpdate = await this.getById(idToUpdate);

    if (!facultyToUpdate) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    Object.assign(facultyToUpdate, faculty);
    const updatedFaculty = await this.repository.save(facultyToUpdate);

    const { id, name, shortName } = updatedFaculty;
    return { id, name, shortName };
  }

  async delete(id: number): Promise<number> {
    const faculty = await this.repository.findOne({ where: { id } });

    if (!faculty) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    const { id: idToSend } = faculty;

    await this.repository.remove(faculty);

    return idToSend;
  }
}
