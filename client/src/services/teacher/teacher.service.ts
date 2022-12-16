import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateTeacherRequestDto,
  TeachersGetAllItemResponseDto,
  TeachersGetAllResponseDto,
  UpdateTeacherRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Teacher {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<TeachersGetAllResponseDto> {
    return this.http.load<TeachersGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.TEACHERS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateTeacherRequestDto
  ): Promise<TeachersGetAllItemResponseDto> {
    return this.http.load<TeachersGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.TEACHERS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateTeacherRequestDto
  ): Promise<TeachersGetAllItemResponseDto> {
    return this.http.load<TeachersGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.TEACHERS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.TEACHERS}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Teacher };
