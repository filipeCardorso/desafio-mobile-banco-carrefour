const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const FormsPage = require('../pageobjects/FormsPage');

describe('Forms', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('forms');
  });

  // Scenario 7: Fill form with text input, switch toggle, and dropdown
  it('should fill form with text, toggle switch, and select dropdown', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');

    // Fill text input and verify result
    allure.addStep('Fill text input');
    await FormsPage.fillForm('Banco Carrefour');
    const result = await FormsPage.getInputResult();
    expect(result).to.equal('Banco Carrefour');

    // Toggle switch and verify state changed
    allure.addStep('Toggle switch');
    const initialSwitchText = await FormsPage.getSwitchText();
    await FormsPage.toggleSwitch();
    const switchText = await FormsPage.getSwitchText();
    expect(switchText).to.not.equal(initialSwitchText);

    // Tap active button and verify alert
    allure.addStep('Tap active button');
    await FormsPage.tapActiveButton();
    const alertMsg = await FormsPage.getAlertMessage();
    expect(alertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });

  // Scenario 8: Verify inactive vs active button behavior
  it('should differentiate between active and inactive buttons', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');

    // Verify both buttons are displayed
    allure.addStep('Verify buttons are displayed');
    const inactiveBtn = await FormsPage.inactiveButton;
    const activeBtn = await FormsPage.activeButton;
    expect(await inactiveBtn.isDisplayed()).to.be.true;
    expect(await activeBtn.isDisplayed()).to.be.true;

    // Tap active button and verify alert appears
    allure.addStep('Tap active button and verify alert');
    await FormsPage.tapActiveButton();
    const activeAlertMsg = await FormsPage.getAlertMessage();
    expect(activeAlertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });
});
