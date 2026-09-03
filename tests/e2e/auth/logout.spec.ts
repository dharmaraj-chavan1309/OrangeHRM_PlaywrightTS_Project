import { expect, test } from '../../../fixtures/base.fixture';
import users from '../../../data/users.json';
import { applicationUrls } from '../../../utils/test-constants';

test.describe('Authentication', () => {
  test('logs out and protects the dashboard route', async ({ page, loginPage, dashboardPage }) => {
    const { validAdminUser } = users;
    await loginPage.open();
    await loginPage.enterCredentials(validAdminUser.username, validAdminUser.password);
    await loginPage.submitLogin();
    await expect(page).toHaveURL(applicationUrls.dashboard);
    await dashboardPage.openProfileMenu();
    await expect(dashboardPage.profileMenuItem('Logout')).toBeVisible();
    await dashboardPage.logout();
    await expect(page).toHaveURL(applicationUrls.login);
    await expect(loginPage.loginHeading()).toBeVisible();
    await page.goto(applicationUrls.dashboard);
    await expect(page).toHaveURL(applicationUrls.login);
  });
});
