import { ApiPath, HttpMethod } from "@/common/enums/enums";
import type { DisciplinesGetAllItemResponseDto } from "@/common/types/types";
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

  public getAll(): Promise<DisciplinesGetAllItemResponseDto> {
    return this.http.load<DisciplinesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.DISCIPLINES}`,
      {
        method: HttpMethod.GET,
      }
    );
  }
}

export { Disciplines };
