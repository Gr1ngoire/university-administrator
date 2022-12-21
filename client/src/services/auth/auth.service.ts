import {
  ApiPath,
  AuthApi,
  ContentType,
  HttpMethod,
} from "@/common/enums/enums";
import type {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Auth {
  private http: HttpService;

  private apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.http = http;
    this.apiPrefix = apiPrefix;
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.http.load<UserSignUpResponseDto>(
      `${this.apiPrefix}${ApiPath.AUTH}${AuthApi.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.http.load<UserSignUpResponseDto>(
      `${this.apiPrefix}${ApiPath.AUTH}${AuthApi.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }
}

export { Auth };
