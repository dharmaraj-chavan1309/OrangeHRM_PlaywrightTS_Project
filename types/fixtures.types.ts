import { type DashboardPage } from '../pages/dashboard.page';
import { type LoginPage } from '../pages/login.page';

export type OrangeHrmFixtures = Readonly<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}>;
