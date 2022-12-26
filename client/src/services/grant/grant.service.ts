import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateGrantRequestDto,
  GrantsGetAllItemAdminResponseDto,
  GrantsGetAllAdminResponseDto,
  UpdateGrantRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Grant {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<GrantsGetAllAdminResponseDto> {
    return this.http.load<GrantsGetAllAdminResponseDto>(
      `${this.apiPrefix}${ApiPath.GRANTS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateGrantRequestDto
  ): Promise<GrantsGetAllItemAdminResponseDto> {
    return this.http.load<GrantsGetAllItemAdminResponseDto>(
      `${this.apiPrefix}${ApiPath.GRANTS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          userId: String(payload.userId),
          granterId: String(payload.granterId),
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateGrantRequestDto
  ): Promise<GrantsGetAllItemAdminResponseDto> {
    return this.http.load<GrantsGetAllItemAdminResponseDto>(
      `${this.apiPrefix}${ApiPath.GRANTS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          granterId: String(payload.granterId),
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(`${this.apiPrefix}${ApiPath.GRANTS}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { Grant };
