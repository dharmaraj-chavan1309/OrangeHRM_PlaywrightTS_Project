export const applicationUrls = {
  login: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  resetCode: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode',
  resetSuccess: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset',
  dashboard: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
} as const;

export const expectedColors = {
  loginBackground: 'rgb(246, 245, 251)',
  primaryButton: 'rgb(255, 123, 29)',
  loginHeading: 'rgb(100, 114, 140)',
  errorText: 'rgb(235, 9, 16)',
  errorBackground: 'rgba(235, 9, 16, 0.05)',
} as const;

export const primaryModules = [
  'Admin',
  'PIM',
  'Leave',
  'Time',
  'Recruitment',
  'My Info',
  'Performance',
  'Dashboard',
  'Directory',
  'Maintenance',
  'Claim',
  'Buzz',
] as const;

export const dashboardWidgets = [
  'Time at Work',
  'My Actions',
  'Quick Launch',
  'Buzz Latest Posts',
  'Employees on Leave Today',
  'Employee Distribution by Sub Unit',
  'Employee Distribution by Location',
] as const;
