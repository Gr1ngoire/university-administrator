import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateNewsRequestDto,
  NewsGetAllItemResponseDto,
  NewsGetAllResponseDto,
  UpdateNewsRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class News {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<NewsGetAllResponseDto> {
    return this.http.load<NewsGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.NEWS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateNewsRequestDto
  ): Promise<NewsGetAllItemResponseDto> {
    return this.http.load<NewsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.NEWS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          imgUrl: payload.imgUrl ?? "",
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateNewsRequestDto
  ): Promise<NewsGetAllItemResponseDto> {
    return this.http.load<NewsGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.NEWS}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          imgUrl: payload.imgUrl ?? "",
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(`${this.apiPrefix}${ApiPath.NEWS}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { News };
