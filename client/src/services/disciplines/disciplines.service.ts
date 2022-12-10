import { ApiPath, HttpMethod } from "@/common/enums/enums";
import type {
  DisciplinesGetAllItemResponseDto,
  DisciplinesGetAllResponseDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Disciplines {
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

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Disciplines };
