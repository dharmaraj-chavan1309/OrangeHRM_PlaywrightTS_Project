import { type Locator, type Page } from '@playwright/test';

export const LOGIN_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
export const RESET_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode';
export const RESET_SUCCESS_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset';

export class LoginPage {
  private readonly page: Page;
  private readonly loginHeadingLocator: Locator;
  private readonly resetHeadingLocator: Locator;
  private readonly resetSuccessHeadingLocator: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordAction: Locator;
  private readonly resetPasswordButton: Locator;
  private readonly cancelButton: Locator;
  private readonly requiredMessages: Locator;
  private readonly invalidCredentialsAlert: Locator;
  private readonly companyBrandingImage: Locator;
  private readonly orangeHrmLogoImage: Locator;
  private readonly footerVersion: Locator;
  private readonly pageBody: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.loginHeadingLocator = page.getByRole('heading', { name: 'Login' });
    this.resetHeadingLocator = page.getByRole('heading', { name: 'Reset Password', exact: true });
    this.resetSuccessHeadingLocator = page.getByRole('heading', { name: 'Reset Password link sent successfully' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordAction = page.getByText('Forgot your password?', { exact: true });
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.requiredMessages = page.getByText('Required', { exact: true });
    this.invalidCredentialsAlert = page.getByRole('alert');
    this.companyBrandingImage = page.getByRole('img', { name: 'company-branding' });
    this.orangeHrmLogoImage = page.getByRole('img', { name: 'orangehrm-logo' });
    this.footerVersion = page.getByText('OrangeHRM OS 5.9', { exact: true });
    this.pageBody = page.locator('body');
  }

  public async open(): Promise<void> {
    await this.page.goto(LOGIN_URL);
  }

  public async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  public async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  public async openPasswordReset(): Promise<void> {
    await this.forgotPasswordAction.click();
  }

  public async enterResetUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  public async submitPasswordReset(): Promise<void> {
    await this.resetPasswordButton.click();
  }

  public async cancelPasswordReset(): Promise<void> {
    await this.cancelButton.click();
  }

  public loginHeading(): Locator { return this.loginHeadingLocator; }
  public resetHeading(): Locator { return this.resetHeadingLocator; }
  public resetSuccessHeading(): Locator { return this.resetSuccessHeadingLocator; }
  public username(): Locator { return this.usernameInput; }
  public password(): Locator { return this.passwordInput; }
  public login(): Locator { return this.loginButton; }
  public forgotPassword(): Locator { return this.forgotPasswordAction; }
  public resetPassword(): Locator { return this.resetPasswordButton; }
  public cancel(): Locator { return this.cancelButton; }
  public required(): Locator { return this.requiredMessages; }
  public invalidAlert(): Locator { return this.invalidCredentialsAlert; }
  public companyBranding(): Locator { return this.companyBrandingImage; }
  public orangeHrmLogo(): Locator { return this.orangeHrmLogoImage; }
  public footerVersionText(): Locator { return this.footerVersion; }
  public body(): Locator { return this.pageBody; }
}
