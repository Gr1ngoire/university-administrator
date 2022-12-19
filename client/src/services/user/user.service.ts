import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateUserRequestDto,
  UsersGetAllItemResponseDto,
  UsersGetAllResponseDto,
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

  public getAll(): Promise<UsersGetAllResponseDto> {
    return this.http.load<UsersGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.USERS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateUserRequestDto
  ): Promise<UsersGetAllItemResponseDto> {
    return this.http.load<UsersGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.USERS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateUserRequestDto
  ): Promise<UsersGetAllItemResponseDto> {
    return this.http.load<UsersGetAllItemResponseDto>(
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
