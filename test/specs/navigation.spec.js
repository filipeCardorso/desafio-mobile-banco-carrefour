const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');

describe('Navigation', () => {
  // Scenario 6: Navigate between all tabs
  const tabs = ['webview', 'login', 'forms', 'swipe', 'drag', 'home'];

  tabs.forEach((tab) => {
    it(`should navigate to ${tab} tab successfully`, async () => {
      allure.addFeature('Navigation');
      allure.addSeverity('normal');
      allure.addStep(`Navigate to ${tab}`);

      await NavigationBar.navigateTo(tab);

      // Verify tab is selected after navigation
      const currentTab = await NavigationBar.getCurrentTab();
      expect(currentTab).to.equal(tab);
    });
  });
});
