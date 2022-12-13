import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateDepartmentRequestDto,
  DepartmentsGetAllItemResponseDto,
  DepartmentsGetAllResponseDto,
  UpdateDepartmentRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Department {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<DepartmentsGetAllResponseDto> {
    return this.http.load<DepartmentsGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.DEPARTMENTS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateDepartmentRequestDto
  ): Promise<DepartmentsGetAllItemResponseDto> {
    return this.http.load<DepartmentsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.DEPARTMENTS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          facultyId: String(payload.facultyId),
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateDepartmentRequestDto
  ): Promise<DepartmentsGetAllItemResponseDto> {
    return this.http.load<DepartmentsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.DEPARTMENTS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          facultyId: String(payload.facultyId),
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.DEPARTMENTS}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Department };
