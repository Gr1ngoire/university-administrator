import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  UsersGetAllItemAdminResponseDto,
  UsersGetAllAdminResponseDto,
  UpdateUserRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class User {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<UsersGetAllAdminResponseDto> {
    return this.http.load<UsersGetAllAdminResponseDto>(
      `${this.apiPrefix}${ApiPath.USERS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public update(
    id: number,
    payload: UpdateUserRequestDto
  ): Promise<UsersGetAllItemAdminResponseDto> {
    return this.http.load<UsersGetAllItemAdminResponseDto>(
      `${this.apiPrefix}${ApiPath.USERS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(`${this.apiPrefix}${ApiPath.USERS}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { User };
