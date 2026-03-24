const BasePage = require('./BasePage');

class DragPage extends BasePage {
  // v2.2.0 uses: drag-l1, drag-c1, drag-r1, drag-l2, drag-c2, drag-r2, drag-l3, drag-c3, drag-r3
  // Pattern: position (l=left, c=center, r=right) + row (1-3)
  get dragElements() {
    return ['l1', 'c1', 'r1', 'l2', 'c2', 'r2', 'l3', 'c3', 'r3'];
  }

  dragElement(index) {
    return $(`~drag-${this.dragElements[index]}`);
  }

  dropElement(index) {
    return $(`~drop-${this.dragElements[index]}`);
  }

  get retryText() {
    return $('~renew');
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
