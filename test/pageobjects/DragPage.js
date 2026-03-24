const BasePage = require('./BasePage');

class DragPage extends BasePage {
  dragElement(index) {
    return $(`~drag-l${Math.floor(index / 3) + 1}-c${(index % 3) + 1}`);
  }

  dropElement(index) {
    return $(`~drop-l${Math.floor(index / 3) + 1}-c${(index % 3) + 1}`);
  }

  get retryText() {
    return $('~Retry');
  }

  get congratsText() {
    return driver.isAndroid
      ? $('//*[contains(@text,"Congratulations")]')
      : $('//*[contains(@label,"Congratulations")]');
  }

  async dragTo(sourceIndex, targetIndex) {
    const source = await this.dragElement(sourceIndex);
    const target = await this.dropElement(targetIndex);

    await source.waitForDisplayed({ timeout: 5000 });
    await target.waitForDisplayed({ timeout: 5000 });

    await source.dragAndDrop(target);
  }

  async isDroppedCorrectly() {
    try {
      const congrats = await this.congratsText;
      return await congrats.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = new DragPage();
