const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  get emailField() {
    return $('~input-email');
  }

  get passwordField() {
    return $('~input-password');
  }

  get loginButton() {
    return $('~button-LOGIN');
  }

  get errorMessage() {
    return driver.isAndroid
      ? $('//android.widget.TextView[@resource-id="android:id/message"]')
      : $('//XCUIElementTypeStaticText[@name]');
  }

  get successMessage() {
    return driver.isAndroid
      ? $('//android.widget.TextView[@resource-id="android:id/message"]')
      : $('//XCUIElementTypeStaticText[@name]');
  }

  async login(email, password) {
    await this.setValue(this.emailField, email);
    await this.setValue(this.passwordField, password);
    await this.tapElement(this.loginButton);
  }

  async getAlertMessage() {
    // v2.2.0 uses custom React Native dialog
    await driver.pause(1500);
    // Try to find any dialog/alert text
    const successMsg = await $('//*[@text="You are logged in!"]');
    const isSuccess = await successMsg.isExisting();
    if (isSuccess) {
      return successMsg.getText();
    }
    // Check for inline validation error text
    const errorMsg = await $('//*[contains(@text,"invalid") or contains(@text,"Invalid") or contains(@text,"Please")]');
    const isError = await errorMsg.isExisting();
    if (isError) {
      return errorMsg.getText();
    }
    return '';
  }

  async dismissAlert() {
    const okButton = await $('//*[@text="OK"]');
    await okButton.waitForDisplayed({ timeout: 5000 });
    await okButton.click();
  }
}

module.exports = new LoginPage();
