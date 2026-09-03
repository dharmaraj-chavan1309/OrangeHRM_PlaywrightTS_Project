# OrangeHRM Open Source Demo Detailed UI Test Plan

## Application Overview

End-to-end functional, navigation, validation, URL, text, accessibility-visible control, and visual color assertions for the OrangeHRM Open Source demo at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. Each test is independent and starts from a fresh browser context or direct login setup. Demo credentials shown by the site are Admin / admin123. Dynamic dashboard values, dates, posts, and user data should be asserted using stable labels or patterns unless explicitly stated.

## Test Scenarios

### 1. Authentication and Password Recovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Display login page, branding, controls, URLs, and baseline colors

**File:** `tests/auth/login-page.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: The URL is exactly https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: The page title is OrangeHRM.
    - expect: The page shows the Login heading, company-branding image, orangehrm-logo image, Username and Password fields, Login button, Forgot your password? action, OrangeHRM OS 5.9 text, copyright text, and four social links.
    - expect: The Username field is a text input with placeholder Username; the Password field is a password input with placeholder Password; the Login button is enabled.
    - expect: The body background computed color is rgb(246, 245, 251). The Login button computed background color is rgb(255, 123, 29). The Login heading computed text color is rgb(100, 114, 140).
    - expect: The displayed credential helper text contains Username : Admin and Password : admin123.
  2. Verify the social and vendor footer links without relying on navigation side effects.
    - expect: LinkedIn href is https://www.linkedin.com/company/orangehrm/mycompany/.
    - expect: Facebook href is https://www.facebook.com/OrangeHRM/.
    - expect: Twitter href is https://twitter.com/orangehrm?lang=en.
    - expect: YouTube href is https://www.youtube.com/c/OrangeHRMInc.
    - expect: OrangeHRM, Inc footer link points to http://www.orangehrm.com/ or the equivalent normalized URL.

#### 1.2. Validate empty login submission

**File:** `tests/auth/empty-login.spec.ts`

**Steps:**
  1. Open the login URL and click Login without entering either field.
    - expect: The URL remains https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: A Required message appears under Username and a Required message appears under Password.
    - expect: The Login button remains available and the Login heading remains visible.
    - expect: No authenticated dashboard content is displayed.
  2. Inspect validation styling.
    - expect: Each required message is visible and readable; capture and assert the approved error-text color from the current CSS/theme rather than a brittle screenshot-only comparison.
    - expect: The fields remain empty and editable.

#### 1.3. Reject invalid credentials

**File:** `tests/auth/invalid-login.spec.ts`

**Steps:**
  1. Enter invalid.user in Username and wrong-password in Password, then click Login.
    - expect: The URL remains https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: An alert is visible with exact text Invalid credentials.
    - expect: The alert has error styling; computed text color is rgb(235, 9, 16) and its background is rgba(235, 9, 16, 0.05).
    - expect: Both username and password values are cleared after the failed submission.
    - expect: The dashboard is not accessible through the resulting page.
  2. Repeat with username-only and password-only combinations.
    - expect: When either field is missing, the corresponding Required validation appears and the request does not authenticate.
    - expect: No stale Invalid credentials alert is incorrectly presented as the only validation for a missing field.

#### 1.4. Password reset form validation and cancel

**File:** `tests/auth/password-reset-form.spec.ts`

**Steps:**
  1. From a fresh login page, activate Forgot your password?.
    - expect: The URL changes to https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode.
    - expect: The page shows Reset Password, the instruction Please enter your username to identify your account to reset your password, a Username field, Cancel button, and Reset Password button.
    - expect: The footer shows OrangeHRM OS 5.9 and copyright content.
  2. Click Reset Password with the username empty.
    - expect: The URL remains the password reset code URL.
    - expect: A Required message appears for the Username field.
    - expect: The form remains displayed and the Username field remains editable.
  3. Enter an arbitrary non-empty username, then click Cancel.
    - expect: The application returns to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: The Login heading and login controls are visible.
    - expect: The reset form is no longer displayed.

#### 1.5. Submit password reset request

**File:** `tests/auth/password-reset-submit.spec.ts`

**Steps:**
  1. Open the password reset code URL, enter unknown.user, and click Reset Password.
    - expect: The URL changes to https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset.
    - expect: The page shows exact heading Reset Password link sent successfully.
    - expect: The page shows A reset password link has been sent to you via email. and You can follow that link and select a new password.
    - expect: The page shows Note: and the administrator contact guidance.
    - expect: The footer contains OrangeHRM OS 5.9 and copyright text.
    - expect: No password or reset-token value is exposed in visible page text.

#### 1.6. Authenticate with valid demo credentials

**File:** `tests/auth/valid-login.spec.ts`

**Steps:**
  1. Open the login URL, enter Admin and admin123, and click Login.
    - expect: The URL changes to https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index.
    - expect: The page title remains OrangeHRM.
    - expect: The authenticated header shows Dashboard and the profile name mandaa Doe or the currently provisioned demo user.
    - expect: The side navigation is visible and includes Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz.
    - expect: The dashboard shows Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, and Employee Distribution by Location.

#### 1.7. Dashboard controls and quick launches

**File:** `tests/dashboard/dashboard-controls.spec.ts`

**Steps:**
  1. Sign in with the valid demo credentials and inspect the dashboard.
    - expect: Search textbox, sidebar collapse control, Upgrade link/button, profile menu trigger, and Topbar Menu control are present and interactive.
    - expect: Quick Launch includes Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet.
    - expect: The Time at Work widget shows Punched Out and a Today duration pattern; My Actions shows pending-action entries or an empty-state equivalent.
    - expect: Dashboard footer shows OrangeHRM OS 5.9 and copyright text.
  2. Use the sidebar Search field to search for Admin, then clear it.
    - expect: The menu filters to matching navigation items without corrupting the page layout.
    - expect: Clearing the search restores the complete primary navigation list.
    - expect: The Dashboard URL remains unchanged unless a result is selected.
  3. Toggle the sidebar collapse control twice.
    - expect: The sidebar changes between expanded and collapsed states without navigating away.
    - expect: The Dashboard heading and main content remain visible in both states.
    - expect: The control remains usable to restore the expanded navigation.
  4. Select each Quick Launch action one at a time from an independent authenticated start.
    - expect: Assign Leave opens the Leave assignment workflow and its URL contains /leave/.
    - expect: Leave List opens a leave list workflow and its URL contains /leave/.
    - expect: Timesheets opens a timesheet workflow and its URL contains /time/.
    - expect: Apply Leave opens the leave application workflow and its URL contains /leave/.
    - expect: My Leave opens the user's leave workflow and its URL contains /leave/.
    - expect: My Timesheet opens the user's timesheet workflow and its URL contains /time/.
    - expect: Each destination displays a page heading or stable label matching the selected function.

#### 1.8. Authenticated primary module navigation

**File:** `tests/navigation/primary-modules.spec.ts`

**Steps:**
  1. From an authenticated fresh start, click each side navigation item independently and wait for the destination page to render.
    - expect: Admin navigates to /web/index.php/admin/viewAdminModule and displays Admin-related page content.
    - expect: PIM navigates to /web/index.php/pim/viewPimModule and displays PIM or Employee Information content.
    - expect: Leave navigates to /web/index.php/leave/viewLeaveModule and displays Leave-related page content.
    - expect: Time navigates to /web/index.php/time/viewTimeModule and displays Time-related page content.
    - expect: Recruitment navigates to /web/index.php/recruitment/viewRecruitmentModule and displays Recruitment-related page content.
    - expect: My Info navigates to /web/index.php/pim/viewMyDetails and displays personal information content.
    - expect: Performance navigates to /web/index.php/performance/viewPerformanceModule and displays Performance-related page content.
    - expect: Dashboard navigates to /web/index.php/dashboard/index and displays Dashboard content.
    - expect: Directory navigates to /web/index.php/directory/viewDirectory and displays Directory content.
    - expect: Maintenance navigates to /web/index.php/maintenance/viewMaintenanceModule and displays Maintenance-related page content.
    - expect: Claim navigates to /web/index.php/claim/viewClaimModule and displays Claim-related page content.
    - expect: Buzz navigates to /web/index.php/buzz/viewBuzz and displays Buzz-related page content.
    - expect: The selected module is visually distinguishable using the application's active-navigation styling; assert its computed color/background against the approved theme value.
  2. Use browser back and forward after visiting two modules.
    - expect: Back returns to the prior module URL and restores its heading/content.
    - expect: Forward returns to the next module URL and restores its heading/content.
    - expect: No unexpected logout occurs during same-session navigation.

#### 1.9. Profile menu and account actions

**File:** `tests/account/profile-menu.spec.ts`

**Steps:**
  1. Sign in and activate the profile menu.
    - expect: A visible menu contains About, Support, Change Password, and Logout.
    - expect: The menu is anchored to the profile area and does not obscure the primary page heading in an unusable way.
  2. Select About.
    - expect: An About dialog or About view appears with OrangeHRM product/version information.
    - expect: The dialog/view can be dismissed and the user remains authenticated.
  3. Select Support.
    - expect: A support view or external support destination opens according to the application's configured behavior.
    - expect: The action does not silently log the user out.
  4. Select Change Password.
    - expect: The change-password view opens with current password, new password, and confirmation controls or the application's equivalent.
    - expect: A stable Change Password heading/label is displayed and the URL matches the application's password-change route.
  5. Return to the dashboard, open the profile menu, and select Logout.
    - expect: The URL returns to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: The Login heading and login fields are displayed.
    - expect: Authenticated navigation and dashboard widgets are no longer available.

#### 1.10. Session protection after logout

**File:** `tests/account/session-protection.spec.ts`

**Steps:**
  1. Authenticate, record the dashboard URL, log out, then navigate directly to https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index.
    - expect: The user is redirected to the login URL or shown an equivalent unauthenticated login state.
    - expect: Dashboard content and authenticated navigation are not accessible without signing in again.
  2. Use browser back after logout.
    - expect: Protected dashboard content is not restored as an active authenticated session.
    - expect: The login screen remains available and the user must authenticate again.

#### 1.11. Responsive layout and visual regression smoke checks

**File:** `tests/visual/responsive-smoke.spec.ts`

**Steps:**
  1. Open the login page at desktop viewport, tablet viewport, and mobile viewport sizes.
    - expect: The Login heading, both fields, Login button, password recovery action, branding, and footer remain visible or accessible without horizontal overflow.
    - expect: Text remains inside its controls and no primary controls overlap.
    - expect: The primary Login button remains orange with computed color rgb(255, 123, 29); the page background remains rgb(246, 245, 251) unless the responsive theme intentionally defines a documented variant.
  2. Sign in and repeat at the same viewport sizes on the dashboard.
    - expect: The header, sidebar/menu access, Dashboard heading, and main content remain usable at each viewport.
    - expect: Sidebar collapse or responsive navigation remains operable.
    - expect: No dashboard widget title or control is clipped, overlapped, or unreachable.
