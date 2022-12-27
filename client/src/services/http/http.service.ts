import {
  ContentType,
  HttpCode,
  HttpHeader,
  HttpMethod,
  StorageKey,
} from "@/common/enums/enums";
import { notification as notificationService } from "../services";
import type {
  AxiosInstance,
  AxiosResponse,
  Method,
  RawAxiosRequestHeaders,
  HttpOptions,
} from "@/common/types/types";
import { HttpError } from "@/exceptions/exceptions";
import { AxiosHeaders, type AxiosRequestConfig } from "axios";
import type { AxiosError } from "axios";
import type { Storage } from "../storage/storage.service";

type ErrorData = {
  message: string;
};

type Constructor = {
  axiosService: AxiosInstance;
  storage: Storage;
};

class Http {
  #axiosService: AxiosInstance;
  #storage: Storage;

  constructor({ axiosService, storage }: Constructor) {
    this.#axiosService = axiosService;
    this.#storage = storage;
  }

  public load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {}
  ): Promise<T> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      queryString,
    } = options;
    const headers: RawAxiosRequestHeaders = {
      headers: this.getHeaders(contentType, hasAuth),
    };

    return this.#axiosService({
      url: this.getUrlWithQueryString(url, queryString),
      method: method as Method,
      headers,
      data: payload,
    })
      .then(this.checkStatus)
      .then((res) => res.data as T)
      .catch((err) => {
        notificationService.error(
          ((err as AxiosError).response?.data as ErrorData).message
        );
        this.displayError(err);
      });
  }

  private getHeaders(
    contentType?: ContentType,
    hasAuth?: boolean
  ): AxiosHeaders {
    const headers = new AxiosHeaders();

    if (contentType) {
      headers.set(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storage.getItem(StorageKey.TOKEN);
      this.#axiosService.interceptors.request.use(
        (config: AxiosRequestConfig<any>) => {
          config.headers![HttpHeader.AUTHORIZATION] = `Bearer ${token}`;
          return config;
        }
      );
    }

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
    if (
      response.status !== HttpCode.OK &&
      response.status !== HttpCode.CREATED
    ) {
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

  private displayError(err: Error): never {
    throw err;
  }
}

export { Http };
