import { ApiPath, ContentType, HttpMethod } from "@/common/enums/enums";
import type {
  CreateScheduleRequestDto,
  SchedulesGetAllItemResponseDto,
  SchedulesGetAllResponseDto,
  UpdateScheduleRequestDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Schedule {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public getAll(groupIdParam?: string): Promise<SchedulesGetAllResponseDto> {
    return this.http.load<SchedulesGetAllResponseDto>(
      `${this.apiPrefix}${ApiPath.SCHEDULES}`,
      {
        method: HttpMethod.GET,
        queryString: groupIdParam
          ? {
              groupId: groupIdParam,
            }
          : undefined,
      }
    );
  }

  public create(
    payload: CreateScheduleRequestDto
  ): Promise<SchedulesGetAllItemResponseDto> {
    return this.http.load<SchedulesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.SCHEDULES}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          disciplineId: String(payload.disciplineId),
          groupId: String(payload.groupId),
          teacherId: String(payload.teacherId),
        }),
      }
    );
  }

  public update(
    id: number,
    payload: UpdateScheduleRequestDto
  ): Promise<SchedulesGetAllItemResponseDto> {
    return this.http.load<SchedulesGetAllItemResponseDto>(
      `${this.apiPrefix}${ApiPath.SCHEDULES}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams({
          ...payload,
          disciplineId: String(payload.disciplineId),
          groupId: String(payload.groupId),
          teacherId: String(payload.teacherId),
        }),
      }
    );
  }

  public delete(id: number): Promise<number> {
    return this.http.load<number>(
      `${this.apiPrefix}${ApiPath.SCHEDULES}/${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Schedule };
