import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateFaqMessageRequestDto,
  FaqMessagesGetAllItemResponseDto,
  FaqMessagesGetAllResponseDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class FaqMessage {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(): Promise<FaqMessagesGetAllResponseDto> {
    return this.http.load<FaqMessagesGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.STUDENTS}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  public create(
    payload: CreateFaqMessageRequestDto
  ): Promise<FaqMessagesGetAllItemResponseDto> {
    return this.http.load<FaqMessagesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.FAQ}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          authorId: String(payload.authorId),
        }),
      }
    );
  }
}

export { FaqMessage };
