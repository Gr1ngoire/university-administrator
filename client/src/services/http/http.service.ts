import { ContentType, ENV, HttpHeader, HttpMethod } from "@/common/enums/enums";
import type { HttpOptions } from "@/common/types/types";
import { HttpError } from "@/exceptions/exceptions";

class HttpService {
  constructor(private apiPath: string = ENV.API.PATH) {}

  public load<T = unknown>(url: string, options: Partial<HttpOptions> = {}) {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      queryString,
    } = options;
    const headers = this.getHeaders(contentType, hasAuth);

    return fetch(this.getUrlWithQueryString(url, queryString), {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJson<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(contentType?: ContentType, hasAuth?: boolean): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
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

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const responseError = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: responseError?.message,
      });
    }

    return response;
  }

  private parseJson<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(error: Error) {
    throw error;
  }
}

export { HttpService };
