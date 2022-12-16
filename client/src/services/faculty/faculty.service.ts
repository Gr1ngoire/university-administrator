import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateFacultyRequestDto,
  FacultiesGetAllItemResponseDto,
  FacultiesGetAllResponseDto,
  UpdateFacultyRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Faculty {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<FacultiesGetAllResponseDto> {
    return this.http.load<FacultiesGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.FACULTIES}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateFacultyRequestDto
  ): Promise<FacultiesGetAllItemResponseDto> {
    return this.http.load<FacultiesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.FACULTIES}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateFacultyRequestDto
  ): Promise<FacultiesGetAllItemResponseDto> {
    return this.http.load<FacultiesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.FACULTIES}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.FACULTIES}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Faculty };
