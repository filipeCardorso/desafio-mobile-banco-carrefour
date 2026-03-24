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

  // Cross-platform helper: find element by text (Android @text, iOS @label/@name)
  async findByText(text, exact = true) {
    if (exact) {
      return driver.isAndroid
        ? $(`//*[@text="${text}"]`)
        : $(`//*[@label="${text}" or @name="${text}"]`);
    }
    return driver.isAndroid
      ? $(`//*[contains(@text,"${text}")]`)
      : $(`//*[contains(@label,"${text}") or contains(@name,"${text}")]`);
  }

  // Cross-platform alert: get message text from custom React Native dialog
  async getAlertText(searchTexts) {
    await driver.pause(1500);
    for (const text of searchTexts) {
      const el = await this.findByText(text, false);
      const exists = await el.isExisting();
      if (exists) {
        return el.getText();
      }
    }
    return '';
  }

  // Cross-platform alert: dismiss by tapping button with text
  async dismissAlertByText(buttonText = 'OK') {
    const btn = await this.findByText(buttonText);
    await btn.waitForDisplayed({ timeout: 5000 });
    await btn.click();
  }
}

module.exports = BasePage;
