const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const SignupPage = require('../pageobjects/SignupPage');
const signupData = require('../data/signupData.json');

describe('Signup', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('login');
    await SignupPage.openSignupForm();
  });

  // Scenario 4: Signup with valid data (data-driven)
  signupData.valid.forEach((data) => {
    it(`should signup successfully with ${data.email}`, async () => {
      allure.addFeature('Signup');
      allure.addSeverity('critical');

      await SignupPage.signup(data.email, data.password, data.confirmPassword);

      const message = await SignupPage.getAlertMessage();
      expect(message).to.include('signed up');
      await SignupPage.dismissAlert();
    });
  });

  // Scenario 5: Signup with invalid/weak password (data-driven)
  signupData.invalid.forEach((data) => {
    it(`should show error for invalid signup: ${data.email}`, async () => {
      allure.addFeature('Signup');
      allure.addSeverity('critical');

      await SignupPage.signup(data.email, data.password, data.confirmPassword);

      const errorText = await $(`//*[contains(@text,"${data.expectedError}")]`);
      expect(await errorText.isDisplayed()).to.be.true;
    });
  });
});
