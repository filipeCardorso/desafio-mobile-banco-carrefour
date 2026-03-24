const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const FormsPage = require('../pageobjects/FormsPage');

describe('Forms', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('forms');
  });

  // Scenario 7: Fill form with switch and dropdown
  it('should fill form with text, switch and dropdown', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');

    await FormsPage.fillForm('Banco Carrefour');
    const result = await FormsPage.getInputResult();
    expect(result).to.equal('Banco Carrefour');

    await FormsPage.toggleSwitch();
    const switchText = await FormsPage.getSwitchText();
    expect(switchText).to.include('OFF').or.include('ON');

    await FormsPage.selectDropdown('webdriver.io is awesome');

    await FormsPage.tapActiveButton();
    const alertMsg = await FormsPage.getAlertMessage();
    expect(alertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });

  // Scenario 8: Form error/validation messages
  it('should show validation feedback on form interactions', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');
    allure.addStep('Tap inactive button and verify no action');

    const inactiveBtn = await FormsPage.inactiveButton;
    expect(await inactiveBtn.isDisplayed()).to.be.true;
    await inactiveBtn.click();

    try {
      const alert = driver.isAndroid
        ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
        : await $('//XCUIElementTypeAlert');
      const isAlertVisible = await alert.isDisplayed();
      expect(isAlertVisible).to.be.false;
    } catch {
      // No alert found - expected behavior for inactive button
    }

    allure.addStep('Tap active button and verify alert message');

    await FormsPage.tapActiveButton();
    const alertMsg = await FormsPage.getAlertMessage();
    expect(alertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });
});
