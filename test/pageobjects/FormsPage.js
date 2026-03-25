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
      // Try CheckedTextView first (API 30+), fallback to generic text match
      try {
        const option = await $(`//android.widget.CheckedTextView[@text="${value}"]`);
        await option.waitForDisplayed({ timeout: 3000 });
        await option.click();
      } catch {
        const fallback = await $(`//*[@text="${value}"]`);
        await this.tapElement(fallback);
      }
    } else {
      const option = await $(`~${value}`);
      await this.tapElement(option);
      const doneButton = await $('~Done');
      await this.tapElement(doneButton);
    }
  }

  async scrollToButtons() {
    const btn = await this.activeButton;
    const isVisible = await btn.isDisplayed().catch(() => false);
    if (!isVisible) {
      await driver.execute('mobile: scrollGesture', {
        left: 100, top: 500, width: 800, height: 500,
        direction: 'down', percent: 1.0,
      });
    }
  }

  async tapActiveButton() {
    await this.scrollToButtons();
    await this.tapElement(this.activeButton);
  }

  async getAlertMessage() {
    return this.getAlertText(['This button is', 'is active']);
  }

  async dismissAlert() {
    try {
      await this.dismissAlertByText('OK');
    } catch {
      await this.dismissAlertByText('Ask me later');
    }
  }
}

module.exports = new FormsPage();
