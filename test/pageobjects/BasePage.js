class BasePage {
  async waitForElement(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  }

  async tapElement(element) {
    await this.waitForElement(element);
    await element.click();
  }

  async getTextOf(element) {
    await this.waitForElement(element);
    return element.getText();
  }

  async isDisplayed(element) {
    try {
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async setValue(element, value) {
    await this.waitForElement(element);
    await element.setValue(value);
  }
}

module.exports = BasePage;
