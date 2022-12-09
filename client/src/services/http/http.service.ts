import {
  ContentType,
  HttpCode,
  HttpHeader,
  HttpMethod,
} from "@/common/enums/enums";
import type {
  AxiosInstance,
  AxiosResponse,
  Method,
  HttpOptions,
} from "@/common/types/types";
import { HttpError } from "@/exceptions/exceptions";
import { AxiosHeaders, type RawAxiosRequestHeaders } from "axios";
import { axios as axiosService } from "../axios/axios";

class HttpService {
  constructor(private axiosServ: AxiosInstance = axiosService) {}

  public load<T = unknown>(url: string, options: Partial<HttpOptions> = {}) {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      queryString,
    } = options;
    const headers = this.getHeaders(contentType, hasAuth);

    return this.axiosServ({
      url: this.getUrlWithQueryString(url, queryString),
      method: method as Method,
      headers: {
        headers,
      },
      data: payload,
    })
      .then(this.checkStatus)
      .then((res) => res)
      .catch(this.throwError);

    // return fetch(this.getUrlWithQueryString(url, queryString), {
    //   method,
    //   headers,
    //   body: payload,
    // })
    //   .then(this.checkStatus)
    //   .then((res) => this.parseJson<T>(res))
    //   .catch(this.throwError);
  }

  private getHeaders(
    contentType?: ContentType,
    hasAuth?: boolean
  ): AxiosHeaders {
    const headers = new AxiosHeaders();

    if (contentType) {
      headers.set(HttpHeader.CONTENT_TYPE, contentType);
    }

    // this part for auth
    // if (hasAuth) {
    // const token = this.#storage.getItem(StorageKey.TOKEN);
    // headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    // }

    return headers;
  }

  private getUrlWithQueryString(
    url: string,
    queryString?: Record<string, unknown>
  ): string {
    if (!queryString) {
      return url;
    }

    const query = new URLSearchParams(
      queryString as Record<string, string>
    ).toString();

    return `${url}?${query}`;
  }

  private checkStatus(
    response: AxiosResponse<any, any>
  ): AxiosResponse<any, any> {
    if (response.status !== HttpCode.OK) {
      const responseError = {
        message: response.statusText,
      };

      throw new HttpError({
        status: response.status,
        message: responseError?.message,
      });
    }

    return response;
  }

  private throwError(error: Error) {
    throw error;
  }
}

export { HttpService };
