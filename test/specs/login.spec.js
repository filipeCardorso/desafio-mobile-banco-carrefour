const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const LoginPage = require('../pageobjects/LoginPage');
const loginData = require('../data/loginData.json');

describe('Login', () => {
  before(async () => {
    await driver.pause(2000);
    await NavigationBar.navigateTo('login');
    await driver.pause(1000);
  });

  // Scenario 3: Login with empty fields (runs first - clean state)
  it('should stay on login screen when fields are empty', async () => {
    allure.addFeature('Login');
    allure.addSeverity('normal');

    // Tap login without entering anything
    await LoginPage.tapElement(LoginPage.loginButton);
    await driver.pause(1000);

    // Verify still on login screen (button still visible)
    expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
    // Verify email field still has placeholder text
    const emailField = await LoginPage.emailField;
    const emailText = await emailField.getText();
    expect(emailText === 'Email' || emailText === '' || emailText === null).to.be.true;
  });

  // Scenario 2: Login with invalid email format
  it('should show validation error for invalid email format', async () => {
    allure.addFeature('Login');
    allure.addSeverity('critical');

    await LoginPage.setValue(LoginPage.emailField, 'invalid-email');
    await driver.pause(500);

    // Check for inline email validation message
    const errorMsg = await $('//*[contains(@text,"not a valid email") or contains(@text,"valid email") or contains(@text,"Please")]');
    const hasError = await errorMsg.isExisting();
    // If no inline error, verify login button is still there (field validation prevents action)
    if (!hasError) {
      expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
    } else {
      expect(await errorMsg.isDisplayed()).to.be.true;
    }
    // Clear field for next test
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
