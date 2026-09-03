import { type APIRequestContext, type APIResponse } from '@playwright/test';

export class ApiClient {
  private readonly request: APIRequestContext;

  public constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async get(path: string): Promise<APIResponse> {
    return await this.request.get(path);
  }

  public async post(path: string, data: object): Promise<APIResponse> {
    return await this.request.post(path, { data });
  }
}
