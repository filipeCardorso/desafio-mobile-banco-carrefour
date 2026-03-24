const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const DragPage = require('../pageobjects/DragPage');

describe('Drag and Drop', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('drag');
  });

  // Scenario 10: Drag and drop elements
  it('should drag elements to their drop zones', async () => {
    allure.addFeature('Drag and Drop');
    allure.addSeverity('normal');

    for (let i = 0; i < 9; i++) {
      await DragPage.dragTo(i, i);
      await driver.pause(300);
    }

    const success = await DragPage.isDroppedCorrectly();
    expect(success).to.be.true;
  });
});
