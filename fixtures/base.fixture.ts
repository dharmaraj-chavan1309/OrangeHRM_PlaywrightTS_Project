import { test as base, type Page } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";

type OrangeHrmFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<OrangeHrmFixtures>({
  loginPage: async ({ page }: { page: Page }, use): Promise<void> => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }: { page: Page }, use): Promise<void> => {
    await use(new DashboardPage(page));
  },
});

export { expect } from "@playwright/test";
