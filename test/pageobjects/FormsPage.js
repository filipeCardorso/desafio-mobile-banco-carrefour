const BasePage = require('./BasePage');

class FormsPage extends BasePage {
  get inputField() {
    return $('~text-input');
  }

  get inputResult() {
    return $('~input-text-result');
  }

  get switchToggle() {
    return $('~switch');
  }

  get switchText() {
    return $('~switch-text');
  }

  get dropdown() {
    return driver.isAndroid
      ? $('//android.view.ViewGroup[@content-desc="Dropdown"]/android.view.ViewGroup')
      : $('~Dropdown');
  }

  get activeButton() {
    return $('~button-Active');
  }

  get inactiveButton() {
    return $('~button-Inactive');
  }

  async fillForm(text) {
    await this.setValue(this.inputField, text);
  }

  async getInputResult() {
    return this.getTextOf(this.inputResult);
  }

  async toggleSwitch() {
    await this.tapElement(this.switchToggle);
  }

  async getSwitchText() {
    return this.getTextOf(this.switchText);
  }

  async selectDropdown(value) {
    await this.tapElement(this.dropdown);
    if (driver.isAndroid) {
      const option = await $(`//android.widget.CheckedTextView[@text="${value}"]`);
      await this.tapElement(option);
    } else {
      const option = await $(`~${value}`);
      await this.tapElement(option);
      const doneButton = await $('~Done');
      await this.tapElement(doneButton);
    }
  }

  async tapActiveButton() {
    await this.tapElement(this.activeButton);
  }

  async getAlertMessage() {
    await driver.pause(1000);
    const msgElement = await $('//android.widget.TextView[contains(@text,"This button")]');
    try {
      await msgElement.waitForDisplayed({ timeout: 5000 });
      return msgElement.getText();
    } catch {
      const anyText = await $('//android.widget.TextView[string-length(@text) > 5]');
      await anyText.waitForDisplayed({ timeout: 5000 });
      return anyText.getText();
    }
  }

  async dismissAlert() {
    // Try different button texts that the custom alert might use
    try {
      const okBtn = await $('//*[@text="OK"]');
      await okBtn.waitForDisplayed({ timeout: 3000 });
      await okBtn.click();
    } catch {
      const askLater = await $('//*[@text="Ask me later"]');
      await askLater.waitForDisplayed({ timeout: 3000 });
      await askLater.click();
    }
  }
}

module.exports = new FormsPage();
