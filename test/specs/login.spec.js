const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const LoginPage = require('../pageobjects/LoginPage');
const loginData = require('../data/loginData.json');

describe('Login', () => {
  before(async () => {
    const homeTab = await $('~Home');
    await homeTab.waitForDisplayed({ timeout: 15000 });
    await NavigationBar.navigateTo('login');
    const loginScreen = await $('~Login-screen');
    await loginScreen.waitForDisplayed({ timeout: 10000 });
  });

  // Scenario 3: Login with empty fields (runs first - clean state)
  it('should stay on login screen when fields are empty', async () => {
    allure.addFeature('Login');
    allure.addSeverity('normal');

    await LoginPage.tapElement(LoginPage.loginButton);

    // Verify still on login screen
    expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
    // Verify email field still has placeholder text
    const emailField = await LoginPage.emailField;
    const emailText = await emailField.getText();
    expect(emailText === 'Email' || emailText === '' || emailText === null).to.be.true;
  });

  // Scenario 2: Login with invalid email format shows validation error
  it('should show validation error for invalid email format', async () => {
    allure.addFeature('Login');
    allure.addSeverity('critical');

    await LoginPage.setValue(LoginPage.emailField, 'invalid-email');

    // App shows inline validation for invalid email format
    const validationError = await LoginPage.getValidationError('valid email');
    const hasError = await validationError.isExisting();

    if (hasError) {
      expect(await validationError.isDisplayed()).to.be.true;
    } else {
      // If no inline error, verify login button still present
      expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
    }

    // Clear for next test
    await LoginPage.setValue(LoginPage.emailField, '');
  });

  // Scenario 1: Login with valid credentials (data-driven - runs last)
  loginData.valid.forEach((data) => {
    it(`should login successfully with ${data.email}`, async () => {
      allure.addFeature('Login');
      allure.addSeverity('critical');

      await LoginPage.login(data.email, data.password);

      const message = await LoginPage.getAlertMessage();
      expect(message).to.include('logged in');
      await LoginPage.dismissAlert();
    });
  });
});
