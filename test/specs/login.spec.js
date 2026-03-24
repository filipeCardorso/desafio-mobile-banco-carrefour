const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const LoginPage = require('../pageobjects/LoginPage');
const loginData = require('../data/loginData.json');

describe('Login', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('login');
  });

  // Scenario 1: Login with valid credentials (data-driven)
  loginData.valid.forEach((data) => {
    it(`should login successfully with ${data.email}`, async () => {
      allure.addFeature('Login');
      allure.addSeverity('critical');

      await LoginPage.login(data.email, data.password);

      const message = await LoginPage.getAlertMessage();
      expect(message).to.include('Success');
      await LoginPage.dismissAlert();
    });
  });

  // Scenario 2: Login with invalid credentials (data-driven)
  loginData.invalid.forEach((data) => {
    it(`should show error for invalid credentials: ${data.email}`, async () => {
      allure.addFeature('Login');
      allure.addSeverity('critical');

      await LoginPage.login(data.email, data.password);

      const message = await LoginPage.getAlertMessage();
      expect(message).to.include(data.expectedError);
      await LoginPage.dismissAlert();
    });
  });

  // Scenario 3: Login with empty fields
  it('should show error when fields are empty', async () => {
    allure.addFeature('Login');
    allure.addSeverity('normal');
    allure.addStep('Tap login without filling fields');

    await LoginPage.tapElement(LoginPage.loginButton);

    const emailField = await LoginPage.emailField;
    const hasError = await emailField.getAttribute('error');
    const isEmailEmpty = (await emailField.getText()) === '' || (await emailField.getText()) === null;
    expect(isEmailEmpty).to.be.true;

    expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
  });
});
