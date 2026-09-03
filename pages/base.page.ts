import { type Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
