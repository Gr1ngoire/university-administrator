import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateDisciplineRequestDto,
  DisciplinesGetAllItemResponseDto,
  DisciplinesGetAllResponseDto,
  UpdateDisciplineRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Discipline {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<DisciplinesGetAllResponseDto> {
    return this.http.load<DisciplinesGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateDisciplineRequestDto
  ): Promise<DisciplinesGetAllItemResponseDto> {
    return this.http.load<DisciplinesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateDisciplineRequestDto
  ): Promise<DisciplinesGetAllItemResponseDto> {
    return this.http.load<DisciplinesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Discipline };
