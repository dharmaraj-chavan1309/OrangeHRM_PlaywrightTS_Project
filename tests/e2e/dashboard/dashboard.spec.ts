import { expect, test } from '../../../fixtures/base.fixture';
import users from '../../../data/users.json';
import { applicationUrls, dashboardWidgets, primaryModules } from '../../../utils/test-constants';

test.describe('Dashboard', () => {
  test('displays authenticated navigation and dashboard widgets', async ({ page, loginPage, dashboardPage }) => {
    const { validAdminUser } = users;
    await loginPage.open();
    await loginPage.enterCredentials(validAdminUser.username, validAdminUser.password);
    await loginPage.submitLogin();
    await expect(page).toHaveURL(applicationUrls.dashboard);
    await expect(page).toHaveTitle('OrangeHRM');
    await expect(dashboardPage.sidePanel()).toBeVisible();
    for (const moduleName of primaryModules) {
      await expect(dashboardPage.moduleLink(moduleName)).toBeVisible();
    }
    for (const widgetName of dashboardWidgets) {
      await expect(dashboardPage.widget(widgetName)).toBeVisible();
    }
  });
});
