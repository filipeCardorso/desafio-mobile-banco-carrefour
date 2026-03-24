const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');

describe('Navigation', () => {
  // Scenario 6: Navigate between all tabs
  const tabScreenMap = {
    webview: 'Webview',
    login: 'Login',
    forms: 'Forms',
    swipe: 'Swipe',
    drag: 'Drag',
    home: 'Home',
  };

  Object.entries(tabScreenMap).forEach(([tab, screenName]) => {
    it(`should navigate to ${tab} tab and load ${screenName} screen`, async () => {
      allure.addFeature('Navigation');
      allure.addSeverity('normal');
      allure.addStep(`Navigate to ${tab}`);

      await NavigationBar.navigateTo(tab);
      await driver.pause(500);

      // Verify screen-specific content loaded (not just tab button)
      const screenIdentifier = driver.isAndroid
        ? await $(`//*[contains(@text,"${screenName}") or contains(@content-desc,"${screenName}")]`)
        : await $(`//*[contains(@label,"${screenName}") or contains(@name,"${screenName}")]`);

      expect(await screenIdentifier.isDisplayed()).to.be.true;
    });
  });
});
