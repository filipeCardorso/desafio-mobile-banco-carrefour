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
    const alert = driver.isAndroid
      ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
      : await $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]');
    await this.waitForElement(alert);
    return alert.getText();
  }

  async dismissAlert() {
    const okButton = driver.isAndroid
      ? await $('//android.widget.Button[@resource-id="android:id/button1"]')
      : await $('~Ok');
    await this.tapElement(okButton);
  }
}

module.exports = new LoginPage();
