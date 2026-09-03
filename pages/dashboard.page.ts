import { type Locator, type Page } from '@playwright/test';

export const DASHBOARD_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

export class DashboardPage {
  private readonly page: Page;
  private readonly navigation: Locator;
  private readonly profileTrigger: Locator;
  private readonly profileMenu: Locator;
  private readonly logoutAction: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole('navigation', { name: 'Sidepanel' });
    this.profileTrigger = page.locator('.oxd-userdropdown-tab');
    this.profileMenu = page.getByRole('menu');
    this.logoutAction = this.profileMenu.getByRole('menuitem', { name: 'Logout' });
  }

  public moduleLink(name: string): Locator {
    return this.navigation.getByRole('link', { name, exact: true });
  }

  public widget(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  public sidePanel(): Locator { return this.navigation; }
  public profile(): Locator { return this.profileTrigger; }
  public profileMenuItem(name: 'About' | 'Support' | 'Change Password' | 'Logout'): Locator {
    return this.profileMenu.getByText(name, { exact: true });
  }

  public async openProfileMenu(): Promise<void> {
    await this.profileTrigger.click();
  }

  public async logout(): Promise<void> {
    await this.logoutAction.click();
  }
}
