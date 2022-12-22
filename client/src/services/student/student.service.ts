import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateStudentRequestDto,
  StudentsGetAllItemResponseDto,
  StudentsGetAllResponseDto,
  UpdateStudentRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Student {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<StudentsGetAllResponseDto> {
    return this.http.load<StudentsGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.STUDENTS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateStudentRequestDto
  ): Promise<StudentsGetAllItemResponseDto> {
    return this.http.load<StudentsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.STUDENTS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          userId: String(payload.userId),
          groupId: String(payload.groupId),
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateStudentRequestDto
  ): Promise<StudentsGetAllItemResponseDto> {
    return this.http.load<StudentsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.STUDENTS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          groupId: String(payload.groupId),
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.STUDENTS}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Student };
