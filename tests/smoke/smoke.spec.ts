import { expect, test } from '../../fixtures/base.fixture';
import users from '../../data/users.json';
import { applicationUrls } from '../../utils/test-constants';

test.describe('Smoke', () => {
  test('loads the application and authenticates successfully', async ({ page, loginPage }) => {
    const { validAdminUser } = users;
    await loginPage.open();
    await expect(page).toHaveURL(applicationUrls.login);
    await expect(loginPage.loginHeading()).toBeVisible();
    await loginPage.enterCredentials(validAdminUser.username, validAdminUser.password);
    await loginPage.submitLogin();
    await expect(page).toHaveURL(applicationUrls.dashboard);
  });
});
