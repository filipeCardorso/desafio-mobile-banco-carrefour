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
    const alert = driver.isAndroid
      ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
      : await $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]');
    await this.waitForElement(alert);
    return alert.getText();
  }

  async dismissAlert() {
    const okButton = driver.isAndroid
      ? await $('//android.widget.Button[@resource-id="android:id/button1"]')
      : await $('~Ask me later');
    await this.tapElement(okButton);
  }
}

module.exports = new FormsPage();
