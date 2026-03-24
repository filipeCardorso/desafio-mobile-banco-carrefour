const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const SwipePage = require('../pageobjects/SwipePage');

describe('Swipe', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('swipe');
  });

  // Scenario 9: Horizontal swipe between cards
  it('should swipe left and right between cards', async () => {
    allure.addFeature('Swipe');
    allure.addSeverity('normal');

    const container = await SwipePage.swipeContainer;
    expect(await container.isDisplayed()).to.be.true;

    await SwipePage.swipeLeft();
    await driver.pause(500);

    await SwipePage.swipeLeft();
    await driver.pause(500);

    await SwipePage.swipeRight();
    await driver.pause(500);

    expect(await container.isDisplayed()).to.be.true;
  });
});
