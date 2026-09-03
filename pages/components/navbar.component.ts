import { type Locator, type Page } from '@playwright/test';

export class NavbarComponent {
  private readonly navigation: Locator;

  public constructor(page: Page) {
    this.navigation = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  public link(name: string): Locator {
    return this.navigation.getByRole('link', { name, exact: true });
  }
}
