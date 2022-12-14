import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateGroupRequestDto,
  GroupsGetAllItemResponseDto,
  GroupsGetAllResponseDto,
  UpdateGroupRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Group {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<GroupsGetAllResponseDto> {
    return this.http.load<GroupsGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.GROUPS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateGroupRequestDto
  ): Promise<GroupsGetAllItemResponseDto> {
    return this.http.load<GroupsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.GROUPS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          departmentId: String(payload.departmentId),
          course: String(payload.course),
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateGroupRequestDto
  ): Promise<GroupsGetAllItemResponseDto> {
    return this.http.load<GroupsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.GROUPS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          departmentId: String(payload.departmentId),
          course: String(payload.course),
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(`${this.apiPrefix}${ApiPath.GROUPS}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { Group };
